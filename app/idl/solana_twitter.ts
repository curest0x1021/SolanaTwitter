export type SolanaTwitter = {
  "version": "0.1.0",
  "name": "solana_twitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tag",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newTag",
          "type": "string"
        },
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "sendComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "parent",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "sendDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "publicKey"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "react",
      "accounts": [
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "inputChar",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateReaction",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "inputChar",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteReaction",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createStatus",
      "accounts": [
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateStatus",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newMessage",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteStatus",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUserAlias",
      "accounts": [
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "alias",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUserAlias",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAlias",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteUserAlias",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "voting",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "result",
          "type": {
            "defined": "VotingResult"
          }
        },
        {
          "name": "votingBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateVoting",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "voting",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newResult",
          "type": {
            "defined": "VotingResult"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "parent",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "option": {
                "defined": "CommentState"
              }
            }
          }
        ]
      }
    },
    {
      "name": "dm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "edited",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "reaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "reactionChar",
            "type": {
              "defined": "ReactionChar"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "status",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "state",
            "type": {
              "option": {
                "defined": "TweetState"
              }
            }
          },
          {
            "name": "tag",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userAlias",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "alias",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voting",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "result",
            "type": {
              "defined": "VotingResult"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CommentState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Edited"
          },
          {
            "name": "Deleted"
          }
        ]
      }
    },
    {
      "name": "ReactionChar",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ThumbsUp"
          },
          {
            "name": "Party"
          },
          {
            "name": "Haha"
          },
          {
            "name": "Wow"
          },
          {
            "name": "Rocket"
          },
          {
            "name": "Eyes"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    },
    {
      "name": "TweetState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Edited"
          },
          {
            "name": "Deleted"
          }
        ]
      }
    },
    {
      "name": "VotingResult",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Like"
          },
          {
            "name": "NoVoting"
          },
          {
            "name": "Dislike"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TooLong",
      "msg": "Exceeding maximum number of allowed characters"
    },
    {
      "code": 6001,
      "name": "UnallowedChars",
      "msg": "Trying to send unallowed characters"
    },
    {
      "code": 6002,
      "name": "NoContent",
      "msg": "Trying to send a tweet without content"
    },
    {
      "code": 6003,
      "name": "NothingChanged",
      "msg": "No changes detected. Nothing that could be updated"
    },
    {
      "code": 6004,
      "name": "AliasPresent",
      "msg": "An alias for this user is already registered"
    }
  ]
};

export const IDL: SolanaTwitter = {
  "version": "0.1.0",
  "name": "solana_twitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tag",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newTag",
          "type": "string"
        },
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "sendComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "parent",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteComment",
      "accounts": [
        {
          "name": "comment",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "sendDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "publicKey"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteDm",
      "accounts": [
        {
          "name": "dm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "react",
      "accounts": [
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "inputChar",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateReaction",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "inputChar",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteReaction",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "reaction",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createStatus",
      "accounts": [
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateStatus",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newMessage",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteStatus",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUserAlias",
      "accounts": [
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "alias",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUserAlias",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAlias",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteUserAlias",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userAlias",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "voting",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tweet",
          "type": "publicKey"
        },
        {
          "name": "result",
          "type": {
            "defined": "VotingResult"
          }
        },
        {
          "name": "votingBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateVoting",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "voting",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newResult",
          "type": {
            "defined": "VotingResult"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "parent",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "state",
            "type": {
              "option": {
                "defined": "CommentState"
              }
            }
          }
        ]
      }
    },
    {
      "name": "dm",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "edited",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "reaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "reactionChar",
            "type": {
              "defined": "ReactionChar"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "status",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "state",
            "type": {
              "option": {
                "defined": "TweetState"
              }
            }
          },
          {
            "name": "tag",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userAlias",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "alias",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "voting",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tweet",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "result",
            "type": {
              "defined": "VotingResult"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CommentState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Edited"
          },
          {
            "name": "Deleted"
          }
        ]
      }
    },
    {
      "name": "ReactionChar",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ThumbsUp"
          },
          {
            "name": "Party"
          },
          {
            "name": "Haha"
          },
          {
            "name": "Wow"
          },
          {
            "name": "Rocket"
          },
          {
            "name": "Eyes"
          },
          {
            "name": "Invalid"
          }
        ]
      }
    },
    {
      "name": "TweetState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Edited"
          },
          {
            "name": "Deleted"
          }
        ]
      }
    },
    {
      "name": "VotingResult",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Like"
          },
          {
            "name": "NoVoting"
          },
          {
            "name": "Dislike"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TooLong",
      "msg": "Exceeding maximum number of allowed characters"
    },
    {
      "code": 6001,
      "name": "UnallowedChars",
      "msg": "Trying to send unallowed characters"
    },
    {
      "code": 6002,
      "name": "NoContent",
      "msg": "Trying to send a tweet without content"
    },
    {
      "code": 6003,
      "name": "NothingChanged",
      "msg": "No changes detected. Nothing that could be updated"
    },
    {
      "code": 6004,
      "name": "AliasPresent",
      "msg": "An alias for this user is already registered"
    }
  ]
};
