var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var validator = require('validator')

var config = require('../config.js')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v)
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: String,

  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  passwordResetToken: String,

  // Profile data
  firstname: { type: String, required: [true, 'First name is required.'] },
  lastname: { type: String, required: [true, 'Last name is required.'] },
  nickname: String,
  serviceInterests: [String],
  picture: String,
  birthdate: String,
  gender: String,
  race: [String],
  groupIdentification: [String],
  computerAccess: [String],
  preferredTimes: [String],
  phone: {
    type: String,
    match: [ /^[0-9]{10}$/, '{VALUE} is not a phone number in the format ##########' ],
    required: [function () { return this.isVolunteer }, 'Phone number is required.']
  },

  highschool: { type: String, required: [function () { return !this.isVolunteer }, 'High school is required.'] },
  currentGrade: String,
  expectedGraduation: String,
  difficultAcademicSubject: String,
  difficultCollegeProcess: [String],
  highestLevelEducation: [String],
  hasGuidanceCounselor: String,
  favoriteAcademicSubject: {
    type: String,
    required: [function () { return this.isVolunteer }, 'Favorite academic subject is required']
  },
  gpa: String,
  collegeApplicationsText: String,
  commonCollegeDocs: [String],
  college: { type: String, required: [function () { return this.isVolunteer }, 'College is required.'] },
  academicInterestsText: String,
  testScoresText: String,
  advancedCoursesText: String,
  extracurricularActivitesText: String,
  heardFrom: String,
  referred: String,
  preferredContactMethod: [String],
  availability: {
    Sunday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Monday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Tuesday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Wednesday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Thursday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Friday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    },
    Saturday: {
      '12a': Boolean,
      '1a': Boolean,
      '2a': Boolean,
      '3a': Boolean,
      '4a': Boolean,
      '5a': Boolean,
      '6a': Boolean,
      '7a': Boolean,
      '8a': Boolean,
      '9a': Boolean,
      '10a': Boolean,
      '11a': Boolean,
      '12p': Boolean,
      '1p': Boolean,
      '2p': Boolean,
      '3p': Boolean,
      '4p': Boolean,
      '5p': Boolean,
      '6p': Boolean,
      '7p': Boolean,
      '8p': Boolean,
      '9p': Boolean,
      '10p': Boolean,
      '11p': Boolean
    }
  },

  timezone: String,
  pastSessions: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'Session' }],

  algebra: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },
  applications: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },
  biology: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },
  chemistry: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  essays: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  geometry: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  planning: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },
  trigonometry: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  esl: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  precalculus: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  calculus: {
    passed: {
      type: Boolean,
      default: false
    },
    tries: {
      type: Number,
      default: 0
    }
  },

  // User status
  isVolunteer: {
    type: Boolean,
    default: false
  },

  onboarding: {
    identityProof: {
      displayName: {
        type: String,
        default: 'Proof of identity'
      },
      description: {
        type: String,
        default: 'Provide a photo id.'
      },
      submitted: {
        type: Boolean,
        default: false
      },
      passed: {
        type: Boolean,
        default: false
      }
    },
    eduProof: {
      displayName: {
        type: String,
        default: 'Proof of education'
      },
      description: {
        type: String,
        default: 'Provide proof of education.'
      },
      submitted: {
        type: Boolean,
        default: false
      },
      passed: {
        type: Boolean,
        default: false
      }
    },
    providedRefs: {
      displayName: {
        type: String,
        default: 'Provide references'
      },
      description: {
        type: String,
        default: 'Provide at least 2 references.'
      },
      submitted: {
        type: Boolean,
        default: false
      },
      passed: {
        type: Boolean,
        default: false
      }
    },
    signedAgreement: {
      displayName: {
        type: String,
        default: 'Sign the legal agreement'
      },
      description: {
        type: String,
        default: 'View and sign the legal agreement.'
      },
      submitted: {
        type: Boolean,
        default: false
      },
      passed: {
        type: Boolean,
        default: false
      }
    },
    scheduleCall: {
      displayName: {
        type: String,
        default: 'Schedule a call'
      },
      description: {
        type: String,
        default: 'Schedule an info call with an UPchieve staff member (Mark).'
      },
      submitted: {
        type: Boolean,
        default: false
      },
      passed: {
        type: Boolean,
        default: false
      }
    }
  },

  /* Fake Users
   * These aren't the same as Test Users; they still receive Twilio texts, etc
   * Fake Users are real, fully functional accounts that we decide not to track because they've been
   * identified as accounts that aren't actual students/volunteers; just people trying out the service.
   */
  isFakeUser: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isTestUser: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  toJSON: {
    virtuals: true
  },

  toObject: {
    virtuals: true
  }
})

// Given a user record, strip out sensitive data for public consumption
userSchema.methods.parseProfile = function () {
  return {
    _id: this._id,
    email: this.email,
    verified: this.verified,
    firstname: this.firstname,
    lastname: this.lastname,
    nickname: this.nickname,
    picture: this.picture,
    isVolunteer: this.isVolunteer,
    onboarding: this.onboarding,
    isAdmin: this.isAdmin,
    referred: this.referred,
    createdAt: this.createdAt,

    birthdate: this.birthdate,
    serviceInterests: this.serviceInterests,
    gender: this.gender,
    race: this.race,
    groupIdentification: this.groupIdentification,
    computerAccess: this.computerAccess,
    preferredTimes: this.preferredTimes,
    phone: this.phone,
    preferredContactMethod: this.preferredContactMethod,
    availability: this.availability,

    highschool: this.highschool,
    currentGrade: this.currentGrade,
    expectedGraduation: this.expectedGraduation,
    difficultAcademicSubject: this.difficultAcademicSubject,
    difficultCollegeProcess: this.difficultCollegeProcess,
    highestLevelEducation: this.highestLevelEducation,
    hasGuidanceCounselor: this.hasGuidanceCounselor,
    gpa: this.gpa,
    college: this.college,
    collegeApplicationsText: this.collegeApplicationsText,
    commonCollegeDocs: this.commonCollegeDocs,
    academicInterestsText: this.academicInterestsText,
    testScoresText: this.testScoresText,
    advancedCoursesText: this.advancedCoursesText,
    extracurricularActivitesText: this.extracurricularActivitesText,
    favoriteAcademicSubject: this.favoriteAcademicSubject,
    heardFrom: this.heardFrom,
    isFakeUser: this.isFakeUser,

    algebra: this.algebra,
    geometry: this.geometry,
    trigonometry: this.trigonometry,
    esl: this.esl,
    precalculus: this.precalculus,
    calculus: this.calculus,

    phonePretty: this.phonePretty,
    isVolunteerApproved: this.isVolunteerApproved,
    hasAvailability: this.hasAvailability,
    hasCertification: this.hasCertification,
    isVolunteerReady: this.isVolunteerReady,
    numberOfHours: this.numberOfHours
  }
}

// Placeholder method to support asynchronous profile parsing
userSchema.methods.getProfile = function (cb) {
  cb(null, this.parseProfile())
}

userSchema.methods.hashPassword = function (password, cb) {
  bcrypt.genSalt(config.saltRounds, function (err, salt) {
    if (err) {
      cb(err)
    } else {
      bcrypt.hash(password, salt, cb)
    }
  })
}

userSchema.methods.verifyPassword = function (candidatePassword, cb) {
  var user = this

  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    } else if (isMatch) {
      return cb(null, user)
    } else {
      cb(null, false)
    }
  })
}

// regular expression that accepts multiple valid U. S. phone number formats
// see http://regexlib.com/REDetails.aspx?regexp_id=58
// modified to ignore trailing/leading whitespace and disallow alphanumeric characters
const PHONE_REGEX = /^\s*(?:[0-9](?: |-)?)?(?:\(?([0-9]{3})\)?|[0-9]{3})(?: |-)?(?:([0-9]{3})(?: |-)?([0-9]{4}))\s*$/

// virtual type for phone number formatted for readability
userSchema.virtual('phonePretty')
  .get(function () {
    if (!this.phone) {
      return null
    }

    // first test user's phone number to see if it's a valid U.S. phone number
    var matches = this.phone.match(PHONE_REGEX)
    if (!matches) {
      return null
    }

    // ignore first element of matches, which is the full regex match,
    // and destructure remaining portion
    var [, area, prefix, line] = matches
    // accepted phone number format in database
    var reStrict = /^([0-9]{3})([0-9]{3})([0-9]{4})$/
    if (!this.phone.match(reStrict)) {
      // autocorrect phone number format
      var oldPhone = this.phone
      this.phone = `${area}${prefix}${line}`
      this.save(function (err, user) {
        if (err) {
          console.log(err)
        } else {
          console.log(`Phone number ${oldPhone} corrected to ${user.phone}.`)
        }
      })
    }
    return `${area}-${prefix}-${line}`
  })
  .set(function (v) {
    if (!v) {
      this.phone = v
    } else {
      // ignore first element of match result, which is the full match,
      // and destructure the remaining portion
      var [, area, prefix, line] = v.match(PHONE_REGEX) || []
      this.phone = `${area}${prefix}${line}`
    }
  })

userSchema.virtual('isVolunteerApproved')
  .get(function () {
    var onboarding = Object.values(this.onboarding)
    for (var i = 0; i < onboarding.length; i++) {
      if (onboarding[i].passed === false) {
        return false
      }
    }
    return true
  })

userSchema.virtual('hasAvailability')
  .get(function () {
    if (this.isVolunteer) {
      var available = []
      var days = Object.values(this.availability)
      for (var day = 0; day < days.length; day++) {
        available = available.concat(Object.values(days[day]).slice(1))
      }
      for (var i = 0; i < available.length; i++) {
        if (available[i]) {
          return true
        }
      }
    }
    return false
  })

userSchema.virtual('hasCertification')
  .get(function () {
    if (this.isVolunteer) {
      var subjects = [this.algebra, this.applications, this.biology, this.calculus, this.chemistry, this.esl, this.essays, this.geometry, this.precalculus, this.trigonometry, this.planning]
      for (var i = 0; i < subjects.length; i++) {
        if (subjects[i].passed) {
          return true
        }
      }
    }
    return false
  })

userSchema.virtual('isVolunteerReady')
  .get(function () {
    return this.hasAvailability && this.hasCertification
  })

userSchema.virtual('numberOfHours')
  .get(function () {
    if (this.isVolunteer) {
      var available = []
      var days = Object.values(this.availability)
      var hours = 0
      for (var day = 0; day < days.length; day++) {
        available = available.concat(Object.values(days[day]).slice(1))
      }
      for (var i = 0; i < available.length; i++) {
        if (available[i]) {
          hours++
        }
      }
    }
    return hours
  })
module.exports = mongoose.model('User', userSchema)
