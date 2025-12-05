const Plan = require('../models/Plan');

const getPlans = async () => {
  try {
    const plans = await Plan.find({});
    return plans;
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { getPlans };
