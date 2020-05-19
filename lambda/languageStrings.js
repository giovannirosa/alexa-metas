/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    pt: {
        translation: {
            SKILL_NAME: 'metas do dia',
            WELCOME_MSG1: `Olá! Bem vindo as suas metas do dia. Quais são seus planos para hoje?`, 
            WELCOME_MSG2: `Bem vindo à sua caixinha de metas. Quais são as metas do dia?`, 
            WELCOME_MSG3: `Ei, um novo dia pede metas renovadas. Que atividades você quer fazer hoje?`, 
            WELCOME_MSG4: 'Opa, pera ai, deixa eu pegar a minha caneta!<break time="1s"/> Pronto... quais são as metas de hoje?',
            WELCOME_REPROMPT_MSG: `Meu plano para hoje é ficar aqui na minha caixinha. Quais são os seus?`,
            WELCOME_BACK_MSG1:`Hm, deixa eu ver aqui...<break time="2s"/> Parece que suas metas para hoje são {{goals}}. Você quer adicionar outras ou remover alguma delas?`,
            WELCOME_BACK_MSG2: `Cadê meu caderninho?!<break time="2s"/>  Ah, achei... suas atividades de hoje são {{goals}}. Quer adicionar ou remover alguma?`,
            WELCOME_BACK_REPROMPT_MSG: `Você quer adicionar ou remover alguma meta para hoje?`,
            NO_GOALS_MSG: `Parece que você não tem metas para hoje! Quer incluir alguma?`,
            REGISTER_GOALS_MSG: `Obrigada, eu vou lembrar que suas metas para hoje são {{goals}}. Gostaria de incluir ou retirar alguma?`,
            CLEAN_GOALS_MSG: `Todas as atividades foram apagadas. Gostaria de incluir novas metas?`,
            HELP_MSG: `Você pode me dizer quais são as atividades que quer realizar hoje. Eu vou guardar e você pode verificar comigo ao longo do dia!`,
            GOODBYE_MSG: `Tchau! Siga firme nas suas metas!`,
            REFLECTOR_MSG: `Você acabou de acionar o {{intentName}}`,
            ERROR_MSG1: `Desculpe, eu não entendi o que você disse. Pode reformular?`,
            ERROR_MSG2: `Ops, eu tava distraída. Pode repetir por favor?`,
            ERROR_TIMEZONE_MSG: `Não consegui determinar seu fuso horário. Por favor verifique as configurações de seu aparelho e certifique-se de que um fuso horário está selecionado. Depois disso, reinicie a skill e tente novamente!`
        }
    },
}
