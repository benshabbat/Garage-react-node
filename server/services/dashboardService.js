import User from "../models/User.js";
import Car from "../models/Car.js";
import Service from "../models/Service.js";
import Appointment from "../models/Appointment.js";
import Message from "../models/Message.js";
import Review from "../models/Review.js";

/**
 * Returns a monthly aggregation pipeline for a Mongoose model since a given date.
 * @param {import("mongoose").Model} Model
 * @param {Date} since
 */
const getMonthlyTrend = (Model, since) =>
  Model.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

let _cache = { data: null, expiresAt: 0 };
const CACHE_TTL_MS = 60_000; // 1 minute

/**
 * Get comprehensive dashboard statistics
 * Results are cached for 60 seconds to reduce DB load.
 * @returns {Object} Dashboard statistics including counts, recent data, and trends
 */
const getDashboardStats = async () => {
  if (_cache.data && Date.now() < _cache.expiresAt) return _cache.data;

  // Get total counts
  const [totalUsers, totalCars, totalServices, totalAppointments, totalMessages, totalReviews] =
    await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Service.countDocuments(),
      Appointment.countDocuments(),
      Message.countDocuments(),
      Review.countDocuments(),
    ]);

  // Get users by role
  const usersByRole = await User.aggregate([
    {
      $group: {
        _id: "$isAdmin",
        count: { $sum: 1 },
      },
    },
  ]);

  const adminCount = usersByRole.find((u) => u._id === true)?.count || 0;
  const regularUserCount = usersByRole.find((u) => u._id === false)?.count || 0;

  // Get recent appointments (last 10)
  const recentAppointments = await Appointment.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("user", "username email");

  // Get appointments by status
  const appointmentsByStatus = await Appointment.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Get recent messages (last 10)
  const recentMessages = await Message.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("from", "username email")
    .populate("to", "username email");

  // Get monthly trends for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [monthlyAppointments, monthlyCars, monthlyRevenue] = await Promise.all([
    getMonthlyTrend(Appointment, sixMonthsAgo),
    getMonthlyTrend(Car, sixMonthsAgo),
    Service.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          revenue: { $sum: "$price" },
          paid: { $sum: { $cond: ["$paid", "$price", 0] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),
  ]);

  // Get top services by name (simple count without appointments relation)
  const topServices = await Service.find().sort({ createdAt: -1 }).limit(5).select("title price");

  // Get average review rating
  const reviewStats = await Review.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$stars" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const avgRating =
    reviewStats.length > 0 && reviewStats[0].averageRating ? reviewStats[0].averageRating : 0;

  const data = {
    overview: {
      totalUsers,
      totalCars,
      totalServices,
      totalAppointments,
      totalMessages,
      totalReviews,
      adminCount,
      regularUserCount,
      averageRating: Number(avgRating).toFixed(1),
    },
    appointments: {
      recent: recentAppointments,
      byStatus: appointmentsByStatus,
    },
    messages: {
      recent: recentMessages,
    },
    trends: {
      monthlyAppointments,
      monthlyCars,
      monthlyRevenue,
    },
    topServices,
  };
  _cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
  return data;
};

export default {
  getDashboardStats,
};
