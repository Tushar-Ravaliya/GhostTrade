import { asyncHandler } from '../utils/async-handler.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { userModel } from '../models/user.models.js';
import { portfolioModel } from '../models/portfolio.model.js';
import { transactionModel } from '../models/transaction.model.js';

/**
 * POST /api/v1/trade/buy
 * Body: { symbol, quantity, price }
 */
export const buyStock = asyncHandler(async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const userId = req.user.id;

  // Validate inputs
  if (!symbol || !quantity || !price) {
    return res.status(400).json(new ApiError(400, 'Symbol, quantity, and price are required'));
  }

  const qty = parseInt(quantity);
  const unitPrice = parseFloat(price);

  if (qty < 1) {
    return res.status(400).json(new ApiError(400, 'Quantity must be at least 1'));
  }
  if (unitPrice <= 0) {
    return res.status(400).json(new ApiError(400, 'Price must be greater than 0'));
  }

  const totalCost = qty * unitPrice;

  // Get user and check balance
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  if (user.balance < totalCost) {
    return res.status(400).json(
      new ApiError(400, `Insufficient balance. You have $${user.balance.toFixed(2)} but need $${totalCost.toFixed(2)}`)
    );
  }

  // Deduct balance
  user.balance -= totalCost;
  await user.save();

  // Update or create portfolio entry
  let portfolio = await portfolioModel.findOne({ user: userId, symbol: symbol.toUpperCase() });

  if (portfolio) {
    // Recalculate average buy price
    const newTotalInvested = portfolio.totalInvested + totalCost;
    const newQuantity = portfolio.quantity + qty;
    portfolio.avgBuyPrice = newTotalInvested / newQuantity;
    portfolio.quantity = newQuantity;
    portfolio.totalInvested = newTotalInvested;
    await portfolio.save();
  } else {
    portfolio = await portfolioModel.create({
      user: userId,
      symbol: symbol.toUpperCase(),
      quantity: qty,
      avgBuyPrice: unitPrice,
      totalInvested: totalCost,
    });
  }

  // Record transaction
  const transaction = await transactionModel.create({
    user: userId,
    symbol: symbol.toUpperCase(),
    type: 'buy',
    quantity: qty,
    price: unitPrice,
    total: totalCost,
    balanceAfter: user.balance,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      transaction,
      portfolio,
      balance: user.balance,
    }, `Successfully bought ${qty} share(s) of ${symbol.toUpperCase()}`)
  );
});

/**
 * POST /api/v1/trade/sell
 * Body: { symbol, quantity, price }
 */
export const sellStock = asyncHandler(async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const userId = req.user.id;

  // Validate inputs
  if (!symbol || !quantity || !price) {
    return res.status(400).json(new ApiError(400, 'Symbol, quantity, and price are required'));
  }

  const qty = parseInt(quantity);
  const unitPrice = parseFloat(price);

  if (qty < 1) {
    return res.status(400).json(new ApiError(400, 'Quantity must be at least 1'));
  }
  if (unitPrice <= 0) {
    return res.status(400).json(new ApiError(400, 'Price must be greater than 0'));
  }

  // Check portfolio holdings
  const portfolio = await portfolioModel.findOne({ user: userId, symbol: symbol.toUpperCase() });

  if (!portfolio || portfolio.quantity === 0) {
    return res.status(400).json(
      new ApiError(400, `You don't own any shares of ${symbol.toUpperCase()}`)
    );
  }

  if (portfolio.quantity < qty) {
    return res.status(400).json(
      new ApiError(400, `Insufficient shares. You own ${portfolio.quantity} share(s) of ${symbol.toUpperCase()} but tried to sell ${qty}`)
    );
  }

  const totalRevenue = qty * unitPrice;

  // Credit balance
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiError(404, 'User not found'));
  }

  user.balance += totalRevenue;
  await user.save();

  // Update portfolio
  portfolio.quantity -= qty;
  portfolio.totalInvested -= qty * portfolio.avgBuyPrice;

  if (portfolio.quantity === 0) {
    portfolio.avgBuyPrice = 0;
    portfolio.totalInvested = 0;
  }

  await portfolio.save();

  // Record transaction
  const transaction = await transactionModel.create({
    user: userId,
    symbol: symbol.toUpperCase(),
    type: 'sell',
    quantity: qty,
    price: unitPrice,
    total: totalRevenue,
    balanceAfter: user.balance,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      transaction,
      portfolio,
      balance: user.balance,
    }, `Successfully sold ${qty} share(s) of ${symbol.toUpperCase()}`)
  );
});

/**
 * GET /api/v1/trade/portfolio
 * Returns all holdings for the logged-in user
 */
export const getPortfolio = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const holdings = await portfolioModel.find({ user: userId, quantity: { $gt: 0 } }).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, holdings, 'Portfolio fetched successfully')
  );
});

/**
 * GET /api/v1/trade/portfolio/:symbol
 * Returns holding for a specific symbol
 */
export const getHolding = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { symbol } = req.params;

  const holding = await portfolioModel.findOne({
    user: userId,
    symbol: symbol.toUpperCase(),
  });

  return res.status(200).json(
    new ApiResponse(200, holding || { quantity: 0, avgBuyPrice: 0, totalInvested: 0 }, 'Holding fetched successfully')
  );
});

/**
 * GET /api/v1/trade/transactions
 * Returns all transaction history for the logged-in user
 */
export const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const transactions = await transactionModel.find({ user: userId }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, transactions, 'Transactions fetched successfully')
  );
});
