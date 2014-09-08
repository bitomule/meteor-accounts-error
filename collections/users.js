validLanguages = ['en', 'es'];

var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    language: {
        type: String,
        allowedValues: validLanguages,
    }
});

Schemas.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true,
    },
    username: {
        type: String,
        optional: true,
    },
    emails: {
        type: [Object],
        optional: true,
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true,
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true,
    },
    createdAt: {
        type: Date,
        label: "createdAt",
        optional:true,
        denyUpdate: true,
        autoValue: function() {
          if (this.isInsert) {
            return new Date;
          } else if (this.isUpsert) {
            return {$setOnInsert: new Date};
          } else {
            this.unset();
          }
        }
    },
  	roles: {
  		type: Object,
  		optional: true,
  		blackbox:true
  	},
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.User);
