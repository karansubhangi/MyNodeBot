// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var replyText = 'no input';
            console.log(context.activity.text);
            console.log(replyText);
            if(context.activity.text == 'hey'){
                replyText = 'Hey wassup';
                //console.log('inside if');
            }else if(context.activity.text=='update'){
                replyText='Enter the INC number'

            }else if(context.activity.text=='INC'){
                replyText=`Updating: ${ context.activity.text }`;

            }
            else{
            replyText = `Echo: ${ context.activity.text }`;
            }
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
