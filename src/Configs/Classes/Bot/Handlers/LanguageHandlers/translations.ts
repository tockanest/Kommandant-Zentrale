const translationsData: TranslationsExport = {
    supportedLanguages: ["en-US", "pt-BR", "epo"],
    translations: {
        default: {
            notInGuild: {
                "en-US": "This command is only available in a guild.",
                "pt-BR": "Este comando só está disponível em um servidor.",
                "epo": "Ĉi tiu komando estas havebla nur en gildo."
            },
            notInDatabase: {
                "en-US": "I could not find you in my database. {ADDITIONAL INFO}",
                "pt-BR": "Não consegui te encontrar no meu banco de dados. {ADDITIONAL INFO}",
                "epo": "Mi ne povis trovi vin en mia datumbazo. {ADDITIONAL INFO}"
            }
        },
        configuration: {
            "invalidSubCommand": {
                "en-US": "Invalid SubCommand",
                "pt-BR": "SubComando Inválido",
                "epo": "Nevalida Subkomando"
            }
        },
        memberCount: {
            "notConfigured": {
                "en-US": "This guild does not have a member count channel configured. Please check that.",
                "pt-BR": "Este servidor não tem um canal de contagem de membros configurado. Por favor, verifique isso.",
                "epo": "Ĉi tiu gildo ne havas membro nombro kanalo agordita. Bonvolu kontroli tion."
            },
            "alreadyConfigured": {
                "en-US": "This channel is already configured for member count\nWant to continue with the configuration?",
                "pt-BR": "Este canal já está configurado para a contagem de membros\nDeseja continuar com a configuração?",
                "epo": "Ĉi tiu kanalo jam estas agordita por membro nombro\nĈu vi volas daŭrigi kun la agordo?"
            },
            "alreadyConfiguredTitle": {
                "en-US": "Configuration Already Exists",
                "pt-BR": "Configuração Já Existe",
                "epo": "Agordo Jam Ekzistas"
            },
            "success": {
                "en-US": "Successfully configured the member count channel.",
                "pt-BR": "Canal de contagem de membros configurado com sucesso.",
                "epo": "Sukcese agordis la kanalon por membro nombro."
            },
            "successRemove": {
                "en-US": "Successfully removed the member count channel.",
                "pt-BR": "Canal de contagem de membros removido com sucesso.",
                "epo": "Sukcese forigis la kanalon por membro nombro."
            },
            "failedContinue": {
                "en-US": "Failed to continue with the configuration.\n```{ERROR}```",
                "pt-BR": "Falha ao continuar com a configuração.\n```{ERROR}```",
                "epo": "Malsukcesis daŭrigi kun la agordo.\n```{ERROR}```"
            },
            "continue": {
                "en-US": "Continue",
                "pt-BR": "Continuar",
                "epo": "Daŭrigi"
            },
            "cancel": {
                "en-US": "Cancel",
                "pt-BR": "Cancelar",
                "epo": "Nuligi"
            },
            "errorAdding": {
                "en-US": "An error occurred while adding the member count channel: **{ERROR}**",
                "pt-BR": "Um erro inesperado ocorreu enquanto o processo de inicialização do contador ocorria: **{ERROR}**",
                "epo": "Eraro okazis dum aldonante la membro nombro kanalo: **{ERROR}**"
            },
            "errorRemove": {
                "en-US": "An error occurred while removing the member count channel: **{ERROR}**",
                "pt-BR": "Um erro inesperado ocorreu enquanto o processo de remoção do contador ocorria: **{ERROR}**",
                "epo": "Eraro okazis dum forigante la membro nombro kanalo: **{ERROR}**"
            }
            
        },
        streamerRegister: {
            "embed-title-default": {
                "en-US": "Streamer Registration",
                "pt-BR": "Registro de Streamer",
                "epo": "Fluigisto Registaro"
            },
            "embed-description-start": {
                "en-US": "Hey {USERNAME} to register as a streamer please click [here]({URL})",
                "pt-BR": "Olá {USERNAME} para se registrar como um streamer por favor clique [aqui]({URL})",
                "epo": "Saluton {USERNAME} por registriĝi kiel fluigisto bonvolu klaku [tie]({URL})"
            },
            "embed-footer-start": {
                "en-US": "Please, if you do not know what you are doing, DO NOT USE THIS. This is a feature made for streamers only.",
                "pt-BR": "Por favor, se você não sabe o que está fazendo, NÃO UTILIZE ESTA FUNÇÃO. Esta é uma funcionalidade feita apenas para streamers.",
                "epo": "Bonvolu, se vi ne scias kion vi faras, NE UZU ĈI TION. Tio estas funkcio farita nur por fluigistoj."
            },
            "embed-description-success": {
                "en-US": "Hey {USERNAME} thanks for registering and using our services. I am pleased to inform you that your registration was successful. Now the only thing you will need to do is create and configure the user rewards by using the command `/streamer rewards register`.",
                "pt-BR": "Olá {USERNAME} obrigado por se registrar e utilizar nossos serviços. Tenho o prazer de informar que seu registro foi bem-sucedido. Agora a única coisa que você precisará fazer é criar e configurar as recompensas de usuário usando o comando `/streamer rewards register`.",
                "epo": "Saluton {USERNAME} dankon pro via registriĝo kaj uzi niajn servojn. Mi ĝojas informi vin ke via registriĝo sukcesis. Nun la sola afero kiun vi devos fari estas krei kaj agordi la uzanto rekompensojn uzante la komandon `/streamer rewards register`."
            },
            "embed-description-error": {
                "en-US": "Hey {USERNAME} an error occurred while registering you as a streamer. Please try again later.",
                "pt-BR": "Olá {USERNAME} um erro ocorreu enquanto tentávamos registrar você como um streamer. Por favor, tente novamente mais tarde.",
                "epo": "Saluton {USERNAME} eraro okazis dum registriĝante vin kiel fluigisto. Bonvolu reprovi poste."
            },
            "embed-description-timeout": {
                "en-US": "Hey {USERNAME} you took too long to complete the registration. Please try again later.",
                "pt-BR": "Olá {USERNAME} você demorou muito para completar o registro. Por favor, tente novamente mais tarde.",
                "epo": "Saluton {USERNAME} vi tro longe daŭris por kompletigi la registriĝon. Bonvolu reprovi poste."
            },
            "embed-description-already-registered": {
                "en-US": "Hey {USERNAME} you are already registered as a streamer. If you want to update your information please use the command `/streamer update`.",
                "pt-BR": "Olá {USERNAME} você já está registrado como um streamer. Se deseja atualizar suas informações por favor utilize o comando `/streamer update`.",
                "epo": "Saluton {USERNAME} vi jam estas registrita kiel fluigisto. Se vi volas ĝisdatigi vian informon bonvolu uzi la komandon `/streamer update`."
            }
        },
        streamerUnregister: {
            "embed-title-default": {
                "en-US": "Streamer Unregister",
                "pt-BR": "Desregistro de Streamer",
                "epo": "Fluigisto Malregistriĝo"
            },
            "embed-description-warning": {
                "en-US": "Hey {USERNAME} you are about to unregister as a streamer. Are you sure you want to continue?\nBy doing so, you will only unregister as a streamer and every viewer will also be unregistered. Which means you will have to set up everything again, including (but not limited to) rewards, economy gains and others. All viewers will also need to register again to receive rewards.",
                "pt-BR": "Olá {USERNAME} você está prestes a se desregistrar como um streamer. Tem certeza de que deseja continuar?\nAo fazer isso, você só se desregistrará como um streamer e todos os espectadores também serão desregistrados. O que significa que você terá que configurar tudo novamente, incluindo (mas não limitado a) recompensas, ganhos de economia e outros. Todos os espectadores também precisarão se registrar novamente para receber recompensas.",
                "epo": "Saluton {USERNAME} vi estas proksima malregistriĝi kiel fluigisto. Ĉu vi certas ke vi volas daŭrigi?\nPer tio, vi nur malregistriĝos kiel fluigisto kaj ĉiu spektanto ankaŭ estos malregistrita. Kio signifas ke vi devos reagordi ĉion denove, inkluzive (sed ne limigite al) rekompensoj, ekonomiaj gajnoj kaj aliaj. Ĉiuj spektantoj ankaŭ devos registri denove por ricevi rekompensojn."
            },
            "embed-description-success": {
                "en-US": "Hey {USERNAME} you have successfully unregistered as a streamer. If you want to register again please use the command `/streamer register`.",
                "pt-BR": "Olá {USERNAME} você desregistrou com sucesso como um streamer. Se deseja se registrar novamente por favor utilize o comando `/streamer register`.",
                "epo": "Saluton {USERNAME} vi sukcese malregistriĝis kiel fluigisto. Se vi volas registri denove bonvolu uzi la komandon `/streamer register`."
            },
            "embed-description-not-registered": {
                "en-US": "Hey {USERNAME} you are not registered as a streamer. If you want to register please use the command `/streamer register`.",
                "pt-BR": "Olá {USERNAME} você não está registrado como um streamer. Se deseja se registrar por favor utilize o comando `/streamer register`.",
                "epo": "Saluton {USERNAME} vi ne estas registrita kiel fluigisto. Se vi volas registri bonvolu uzi la komandon `/streamer register`."
            },
            "button-cancel": {
                "en-US": "Cancel",
                "pt-BR": "Cancelar",
                "epo": "Nuligi"
            },
            "button-continue": {    
                "en-US": "Continue",
                "pt-BR": "Continuar",
                "epo": "Daŭrigi"
            }
        }
    },
};

export default translationsData;