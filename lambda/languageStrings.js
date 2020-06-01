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
            WELCOME_MSG1: `Olá! Bem vindo às suas metas diárias. Quais são seus planos para hoje?`, 
            WELCOME_MSG2: `Bem vindo à sua caixinha de metas. Quais são as metas do dia?`, 
            WELCOME_MSG3: `Ei, um novo dia pede metas renovadas. Que atividades você quer fazer hoje?`, 
            WELCOME_MSG4: 'Opa, pera ai, deixa eu pegar a minha caneta!<break time="1s"/> Pronto... quais são as metas de hoje?',
            WELCOME_REPROMPT_MSG: `Meu plano para hoje é ficar aqui na minha caixinha. Quais são os seus?`,
            WELCOME_BACK_MSG1:`Hm, deixa eu ver aqui...<break time="2s"/> Parece que suas metas para hoje são {{goals}}. Você quer adicionar outras ou remover alguma delas?`,
            WELCOME_BACK_MSG2: `Puxa vida...<break time="0.5s"/> cadê meu caderninho?!<break time="2s"/>  Ah, achei... suas atividades de hoje são {{goals}}. Quer adicionar ou remover alguma?`,
            WELCOME_BACK_REPROMPT_MSG: `Você quer adicionar ou remover alguma meta para hoje?`,
            NO_GOALS_MSG: `Parece que você não tem metas para hoje! Quer incluir alguma?`,
            REGISTER_GOALS_MSG: `Obrigada, eu vou lembrar que suas metas para hoje são {{goals}}. Gostaria de incluir ou retirar alguma?`,
            DENIED_GOALS_MSG: `Tudo bem, ação cancelada. Deseja mais alguma coisa?`,
            CLEAN_GOALS_MSG: `Todas as atividades foram apagadas. Gostaria de incluir novas metas?`,
            HELP_MSG: `Você pode me dizer quais são as atividades que quer realizar hoje. Eu vou guardar e você pode verificar comigo ao longo do dia! Você também pode adicionar, remover, listar ou limpar todas as metas.`,
            GOODBYE_MSG1: `Tchau! Siga firme nas suas metas!`,
            GOODBYE_MSG2: `Até mais! Se estiver com dificuldade em se concentrar, tente focar em uma atividade por 25 minutos, dando 5 minutos de intervalo para esfriar a cabeça e retornar ao foco!`,
            GOODBYE_MSG3: `Até logo! Não seja tão duro consigo mesmo, as vezes precisamos de um tempo sem fazer nada de mais!`,
            GOODBYE_MSG4: `Tchauzinho! Eu sei que você está se dedicando hoje!`,
            GOODBYE_MSG5: `Até a próxima! Se você cumprir todas as metas se sentirá muito bem, se não você sempre terá o amanhã!`,
            GOODBYE_MSG6: `Tchau! Os problemas são oportunidades para se mostrar o que sabe!`,
            GOODBYE_MSG7: `Até logo! Nossos fracassos, às vezes, são mais frutíferos do que os êxitos!`,
            GOODBYE_MSG8: `Até mais! Tente de novo. Fracasse de novo. Mas fracasse melhor!`,
            GOODBYE_MSG9: `Até a próxima! É costume de um tolo, quando erra, queixar-se dos outros. É costume de um sábio queixar-se de si mesmo!`,
            GOODBYE_MSG10: `Tchauzinho! O verdadeiro heroísmo consiste em persistir por mais um momento, quando tudo parece perdido!`,
            GOODBYE_MSG11: `Tchau! Nada acontece a menos que sonhemos antes!`,
            GOODBYE_MSG12: `Até mais! É sempre divertido fazer o impossível!`,
            GOODBYE_MSG13: `Até logo! Lembre sempre que a sua vontade de triunfar é mais importante do que qualquer outra coisa!`,
            GOODBYE_MSG14: `Até a próxima! Um objetivo nada mais é do que um sonho com limite de tempo!`,
            GOODBYE_MSG15: `Tchau! Sorte é o que acontece quando a preparação encontra a oportunidade!`,
            GOODBYE_MSG16: `Tchauzinho! O único lugar que o sucesso vem antes do trabalho é no dicionário!`,
            GOODBYE_MSG17: `Até mais! A qualidade do seu trabalho tem tudo a ver com a qualidade da sua vida!`,
            GOODBYE_MSG18: `Até logo! Somos o que repetidamente fazemos. Portanto, a excelência não é um feito, é um hábito!`,
            GOODBYE_MSG19: `Até a próxima! Autorrespeito, autoconhecimento e autocontrole conduzem a vida ao poder supremo!`,
            GOODBYE_MSG20: `Tchauzinho! Tudo o que você sempre quis está do outro lado do seu medo!`,
            REFLECTOR_MSG: `Você acabou de acionar o {{intentName}}`,
            ERROR_MSG: `Opa, um erro foi detectado no meu radar, já estou acionando nossos construtores. Por favor repita ou comece novamente.`,
            ERROR_TIMEZONE_MSG: `Não consegui determinar seu fuso horário. Por favor verifique as configurações de seu aparelho e certifique-se de que um fuso horário está selecionado. Depois disso, reinicie a skill e tente novamente!`
        }
    },
}
