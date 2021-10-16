import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/eating-tracker', {
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

// Dashboard values
// 1) Pre-set "state"
// 2) Editable state through modal
// 3) API GET call of MongoDB database

// First name
// Last name
// DOB
// Weight
// Height



export default connectDB; 