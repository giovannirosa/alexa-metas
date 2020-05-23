// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

/////////////////////////////////
// Modules Definition
/////////////////////////////////

// ASK SDK
const Alexa = require('ask-sdk-core');
// ASK SDK adapter to connecto to Amazon S3
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// We import a language strings object containing all of our strings.
// The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG')
const languageStrings = require('./languageStrings');
// We will use the moment.js package in order to make sure that we calculate the date correctly
const moment = require('moment-timezone');

/////////////////////////////////
// Handlers Definition
/////////////////////////////////

const goalsToList = (goals) => {
    const goalList = goals.split(',');
    const finalGoalList = [];
    goalList.forEach(g => {
        if (g.includes(' e ')) {
            g.split(' e ').forEach(gs => finalGoalList.push(gs));
        } else {
            finalGoalList.push(g);
        }
    });
    
    return finalGoalList;
}

const listToGoals = (list) => {
    const str = list.join(', ');
    const n = str.lastIndexOf(', ');
    return str.slice(0, n) + str.slice(n).replace(', ', ' e ');
}

const randomIndex = (max) => Math.floor(Math.random() * max + 1);

/**
 * Handles LaunchRequest requests sent by Alexa when activities has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const HasGoalsLaunchRequestHandler = {
    canHandle(handlerInput) {
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};

        const goals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : null;

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
            && goals;
    },
    async handle(handlerInput) {
        const { serviceClientFactory, requestEnvelope, attributesManager } = handlerInput;
        const deviceId = Alexa.getDeviceId(requestEnvelope)
        const sessionAttributes = attributesManager.getSessionAttributes() || {};

        const goals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : [];
        const goalsStr = listToGoals(goals);
        
        console.log(goals, goalsStr);
        
        let speakOutput = handlerInput.t('NO_GOALS_MSG');
        if (goals.length > 0) {
            speakOutput = handlerInput.t('WELCOME_BACK_MSG' + randomIndex(2), { goals: goalsStr });
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles LaunchRequest requests sent by Alexa when no birthdate has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG' + randomIndex(4));
        const repromptOutput = handlerInput.t('WELCOME_REPROMPT_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

/**
 * Handles GoalsCaptureIntent requests sent by Alexa (when a user specify activities)
 * Note : this request is sent when the user makes a request that corresponds to GoalsCaptureIntent intent defined in your intent schema.
 */
const GoalsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalsCaptureIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const storedGoals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : '';
        
        let goalList = goalsToList(Alexa.getSlotValue(requestEnvelope, 'goals'));
        if (storedGoals) {
            const addGoals = goalsToList(Alexa.getSlotValue(requestEnvelope, 'goals'));
            goalList = [...storedGoals, ...addGoals];
            console.log(goalList);
        } else {
            const date = moment();
            console.log(goalList, date);
            attributesManager.setPersistentAttributes({goals: goalList, date});
        }

        await attributesManager.savePersistentAttributes();

        const speakOutput = handlerInput.t('REGISTER_GOALS_MSG', { goals: listToGoals(goalList) });
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles GoalsAdditionIntent requests sent by Alexa (when a user add activities)
 * Note : this request is sent when the user makes a request that corresponds to GoalsAdditionIntent intent defined in your intent schema.
 */
const AddGoalsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalsAdditionIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};

        const storedGoals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : '';
        const addGoals = goalsToList(Alexa.getSlotValue(requestEnvelope, 'goals'));
        const mergedGoals = [...storedGoals, ...addGoals];
        
        
        console.log(mergedGoals);

        attributesManager.setPersistentAttributes({goals: mergedGoals});
        await attributesManager.savePersistentAttributes();
        
        const goalsStr = listToGoals(mergedGoals);
        
        const speakOutput = handlerInput.t('REGISTER_GOALS_MSG', { goals: goalsStr });
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles GoalsRemovalIntent requests sent by Alexa (when a user remove activities)
 * Note : this request is sent when the user makes a request that corresponds to GoalsRemovalIntent intent defined in your intent schema.
 */
const DelGoalsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalsRemovalIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};

        const storedGoals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : '';
        const delGoals = goalsToList(Alexa.getSlotValue(requestEnvelope, 'goals'));
        let purgedGoals = storedGoals.filter(g => !delGoals.includes(g))
        if (purgedGoals.length === 0) {
            purgedGoals = null;
        }
        
        
        console.log(purgedGoals);

        attributesManager.setPersistentAttributes({goals: purgedGoals});
        await attributesManager.savePersistentAttributes();
        
        let speakOutput = handlerInput.t('NO_GOALS_MSG');
        if (purgedGoals) {
            speakOutput = handlerInput.t('REGISTER_GOALS_MSG', { goals: listToGoals(purgedGoals) });
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles GoalsCleaningIntent requests sent by Alexa (when a user clean activities)
 * Note : this request is sent when the user makes a request that corresponds to GoalsCleaningIntent intent defined in your intent schema.
 */
const CleanGoalsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalsCleaningIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        attributesManager.setSessionAttributes({});
        await attributesManager.deletePersistentAttributes();

        const speakOutput = handlerInput.t('CLEAN_GOALS_MSG');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles GoalsListingIntent requests sent by Alexa (when a user list activities)
 * Note : this request is sent when the user makes a request that corresponds to GoalsListingIntent intent defined in your intent schema.
 */
const ListGoalsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalsListingIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes() || {};
        
        const storedGoals = sessionAttributes.hasOwnProperty('goals') ? sessionAttributes.goals : '';
        const goalsStr = listToGoals(storedGoals);

        const speakOutput = handlerInput.t('WELCOME_BACK_MSG' + randomIndex(2), { goals: goalsStr });
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};

/**
 * Handles AMAZON.HelpIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.HelpIntent intent defined in your intent schema.
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Handles AMAZON.CancelIntent & AMAZON.StopIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.CancelIntent & AMAZON.StopIntent intents defined in your intent schema.
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', { intentName: intentName });

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speakOutput = handlerInput.t('ERROR_MSG' + randomIndex(2));

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/////////////////////////////////
// Interceptors Definition
/////////////////////////////////

/**
 * This request interceptor will log all incoming requests in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log("\n" + "********** REQUEST *********\n" +
            JSON.stringify(handlerInput, null, 4));
    }
};

/**
 * This response interceptor will log outgoing responses if any in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        if (response) console.log("\n" + "************* RESPONSE **************\n"
            + JSON.stringify(response, null, 4));
    }
};

/**
 * This request interceptor will bind a translation function 't' to the handlerInput
 */
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

/* *
 * This request interceptor will load the persistent attributes as sessions attributes whatever handler is called.
 * 
 * Note: Below we use async and await ( more info: javascript.info/async-await )
 * It's a way to wrap promises and wait for the result of an external async operation
 * Like getting and saving the persistent attributes
 * */
const LoadGoalsInterceptor = {
    async process(handlerInput) {
        const { attributesManager } = handlerInput;
        const sessionAttributes = await attributesManager.getPersistentAttributes() || {};

        const goals = sessionAttributes.hasOwnProperty('goals') && sessionAttributes.goals.length > 0 ? sessionAttributes.goals : null;
        const date = sessionAttributes.hasOwnProperty('date') ? sessionAttributes.date : null;
        
        const diffDays = moment().diff(moment(date), 'days');
        console.log(date, diffDays);
        if (diffDays > 0) {
            await attributesManager.deletePersistentAttributes();
        } else if (goals) {
            attributesManager.setSessionAttributes(sessionAttributes);
        }
    }
}

/////////////////////////////////
// SkillBuilder Definition
/////////////////////////////////

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({ bucketName: process.env.S3_PERSISTENCE_BUCKET })
    )
    .addRequestHandlers(
        HasGoalsLaunchRequestHandler,
        LaunchRequestHandler,
        GoalsIntentHandler,
        AddGoalsIntentHandler,
        DelGoalsIntentHandler,
        CleanGoalsIntentHandler,
        ListGoalsIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor,
        LoadGoalsInterceptor
    )
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();