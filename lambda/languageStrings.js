/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    pt: {
        translation: {
            WELCOME_MSG: `Olá! Bem vindo à sua meta diária. Quais são seus planos para hoje?`,
            WELCOME_REPROMPT_MSG: `Meu plano para hoje é ficar aqui na minha caixinha. Quais são os seus?`,
            WELCOME_BACK_MSG: `Hm deixa eu ver aqui. Parece que suas metas para hoje são {{goals}}.`,
            WELCOME_BACK_MSG_plural: `Que bom que você está de volta! Parece que faltam {{count}} dias até o seu {{age}}º aniversário.`,
            NO_GOALS_MSG: `Parece que você não tem metas para hoje!`,
            REGISTER_GOALS_MSG: `Obrigada, eu vou lembrar que suas metas para hoje são {{goals}}.`,
            HELP_MSG: `Você pode me dizer o dia em que você nasceu e eu vou tomar nota. Você também pode dizer, "anote meu aniversário" eu irei guiar sua interação. Qual deles você quer tentar?`,
            GOODBYE_MSG: `Tchau!`,
            REFLECTOR_MSG: `Você acabou de acionar o {{intentName}}`,
            ERROR_MSG: `Desculpe, eu não entendi o que você disse. Pode reformular?`,
            ERROR_TIMEZONE_MSG: `Não consegui determinar seu fuso horário. Por favor verifique as configurações de seu aparelho e certifique-se de que um fuso horário está selecionado. Depois disso, reinicie a skill e tente novamente!`
        }
    },
}
