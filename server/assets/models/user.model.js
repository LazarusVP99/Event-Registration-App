import { Schema, model } from "mongoose";
import validator from 'validator'

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    validate: {
      validator: (value) => value.length >= 3,
      message: 'Full name must be at least 3 characters'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value, {
        allow_ip_domain: false,
        allow_utf8_local_part: true,
        require_tld: true,
      }),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now,
  },
  eventSeeker: {
    type: [String],
    required: true,
    enum: ['Social Media', 'Friends', 'Found Myself', 'Other'],
    default: [],
  },
  eventsParticipant: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
})

userSchema.statics.emailTaken = async function (email) {
  const user = (await this.findOne({ email }));
  return !!user;
};

userSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    returnedObj.id = String(returnedObj._id);
    delete returnedObj.id;
  },
  versionKey: false,
});

export default model('User', userSchema);