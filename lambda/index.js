// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
var utils = require('./util.js');
var speakOutput = [];
const finalMessage = '<break time="1s"/> Se quiser ouvir as próximas dicas, diga próximas. Se quiser sair, diga parar. Ou, me pergunte sobre um comando em específico.';
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutputGeral = [ '<break time="1s"/> Você conhece o comando C P ? O comando C P, é utilizado para copiar arquivos e diretórios.',
                    '<break time="1s"/>  Você já ouviu falar do comando L S ? O comando L S, é utilizado para mostrar arquivos e diretórios existentes no seu disco, bem como suas propriedades.',
                    '<break time="1s"/>  Comando D F, você já ouviu falar ? O comando D F, mostra a quantidade de espaço usada no seu disco.', 
                    '<break time="1s"/>  Você já ouviu falar do comando TOP ? O comando TOP, É utilizado para listar os processos que mais usam c.p.u, útil para verificar quais processos estão a provocar um uso excessivo de memória e quanta porcentagem de c.p.u cada um usa em dado momento.',
                    '<break time="1s"/>  Você conhece o comando M V ? O comando M V, é utilizado para mover ou renomear arquivos e diretórios.',
                    '<break time="1s"/>  Você já ouviu falar do comando C D ? O comando C D, é utilizado para fazer a navegação em diretórios. É a abreviatura de <lang xml:lang="en-US">change directory.</lang>',
                    '<break time="1s"/>  Comando R M, você já ouviu falar ? O comando R M, é utilizado para remover um arquivo ou um diretório.',
                    '<break time="1s"/>  Você conhece o comando CAT ? O comando CAT, é utilizado para abrir um arquivo.',
                    '<break time="1s"/>  Você já ouviu falar do comando W ? Isso mesmo, apenas a letra W . Trata-se de um comando utilizado para nos mostrar quem está no sistema, ou que comando cada job está à executar.',
                    '<break time="1s"/>  Você já ouviu falar do comando M K DIR ? O comando M K DIR, é utilizado para criar um diretório.',
                    '<break time="1s"/>  Você conhece o comando LOG OUT ? O comando LOG OUT, é utilizado para deslogar, ou seja, terminar a sessão atual.',
                    '<break time="1s"/>  Você sabe para o que serve o comando PASS WD ? O comando PASS WD, é utilizado para mudar a senha do usuário com o qual você estiver logado no momento.',
                    '<break time="1s"/>  Comando SSH, você já ouviu falar ? O comando S S H, nos permite logar num servidor remoto através do protocolo S S H.',
                    '<break time="1s"/>  Você conhece o comando C H MOD ? O comando C H MOD, é utilizado para mudar a proteção de um arquivo ou diretório.',
                    '<break time="1s"/>  Você já ouviu falar do comando CHOWN ? O comando CHOWN, é utilizado para mudar o dono ou grupo de um arquivo ou diretório. Vem de <lang xml:lang="en-US">change owner.</lang>',
                    '<break time="1s"/>  Comando C M P, você já ouviu falar ? O comando C M P, é utilizado para comparar dois arquivos.',
                    '<break time="1s"/>  Você sabe para o que serve o comando GREP ? O comando GREP, é utilizado para procurar um arquivo por um padrão, sendo um filtro bastante útil e usado.',
                    '<break time="1s"/>  Você conhece o comando L N ? O comando L N, é utilizado para criar um link à um arquivo. Link esse, conhecido como link simbólico.',
                    '<break time="1s"/>  Você já ouviu falar do comando PÍNGUI ? O comando PÍNGUI, é utilizado para pingar um determinado host, ou seja, enviar pacotes i c m p para um determinado host e medir tempos de resposta, entre outras coisas.',
                    '<break time="1s"/>  Comando <lang xml:lang="en-US">DATE</lang>, Você já ouviu falar ? O comando <lang xml:lang="en-US">DATE</lang>, é utilizado para exibir a data e a hora.',
                    '<break time="1s"/>  Você já ouviu falar do comando P.W.D ? O comando P.W.D, é utilizado para nos mostrar o caminho por inteiro do diretório em que nos encontramos em dado momento, ou seja, um path name.',
                    '<break time="1s"/>  Você sabe para o que serve o comando KILL ? O comando KILL, é utilizado para encerrar um programa que não esteja respondendo bem. Ele vai mandar um certo sinal ao aplicativo com mau funcionamento e instruir que ele seja encerrado logo na sequência.',
                    
                    
                    '<break time="1s"/>  Você conhece o comando <lang xml:lang="en-US">MAN.</lang> ? Trata-se de um manual online. É o comando de ajuda mais utilizado no Linux',
                    '<break time="1s"/>  Você já ouviu falar do comando INFO ? O comando INFO, é bastante parecido com o comando MAN, trata-se da tentativa de uma nova proposta de manual <lang xml:lang="en-US">on-line.</lang> com novos recursos. Porém, desde sua criação até o presente momento, o comando INFO não obteve muito sucesso. Poucas pessoas utilizam o comando INFO.',
                    '<break time="1s"/>  Comando DIFF, você já ouviu falar ? O comando DIFF, compara o conteúdo de dois arquivos e relata a diferença entre eles. O DIFF, não compara exclusivamente arquivos, ele também pode comparar diretórios ou pastas, e até arquivos compactados.',
                    '<break time="1s"/>  Você sabe para o que serve o comando DD ? O comando DD, possui o objetivo principal de converter e copiar arquivos. Trata-se de um comando muito utilizado para criar uma imagem a partir de dados existentes em uma mídia ou dispositivo.',
                    '<break time="1s"/>  Você conhece o comando PS ? O comando PS, é utilizado para mostrar os processos que estão ativos no momento.',
                    '<break time="1s"/>  Você sabe para que serve o comando JOBS ? O comando JOBS, mostra os processos que estão sendo executados em segundo plano.',
                    '<break time="1s"/>  Comando arch, você já ouviu falar ? Não, não tem nada a ver com <lang xml:lang="en-US">arch linux.</lang> O comando arch, É utilizado para mostrar a arquitetura de processamento da máquina.',
                    '<break time="1s"/>  Você sabe para que serve o comando  L S  U S B ? O comando  L S  U S B, Mostra os dispositivos u s b que estão sendo utilizados.',
                    '<break time="1s"/>  Comando WC, você já ouviu falar ? O comando WC, é utilizado para contar as palavras, linhas ou bytes de cada arquivo de entrada e gera o resultado.',
                    '<break time="1s"/>  Você conhece o comando LAST ? O comando LAST, exibe todas as informações referentes a <lang xml:lang="en-US">log in</lang> e <lang xml:lang="en-US">log out</lang> de usuários do sistema.'];
        speakOutput = speakOutputGeral;
        console.log(`tamanho array início ${speakOutput.length}`);
        var tips; 
        var firstTip = [utils.randomBetWeenTwoNumbers(0, speakOutput.length - 1)];
        var tip1 = speakOutput.splice(firstTip,1);
        console.log(speakOutput.length);
        tips = tip1;
        var secondTip = [utils.randomBetWeenTwoNumbers(0, speakOutput.length - 1)];
        var tip2 = speakOutput.splice(secondTip,1);
        console.log(speakOutput.length);
        tips += '<break time="1s"/>tenho uma outra dica para você.' + tip2;
        const welcomeMessage = '<say-as interpret-as="interjection">olá</say-as>. <amazon:emotion name="excited" intensity="high">Seja bem-vindo ao dicas Linux por pingüim criativo. Darei a você algumas dicas relacionadas ao sistema do pingüim.</amazon:emotion>'
        //var welcomeMessages = welcomeMessage[utils.randomBetWeenTwoNumbers(0, welcomeMessage.length - 1)];
        return handlerInput.responseBuilder 
            .speak(welcomeMessage + tips + finalMessage)
            .reprompt(welcomeMessage)
            .getResponse();
    }
};

// Início das Intents relacionadas a comandos específicos *********************************************************
const CommandCPIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCPIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando C P, é utilizado para copiar arquivos e diretórios.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandLSIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandLSIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando L S, é utilizado para mostrar arquivos e diretórios existentes no seu disco, bem como suas propriedades.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandDFIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandDFIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando D F, mostra a quantidade de espaço usada no seu disco.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandTOPIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandTOPIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando TOP, É utilizado para listar os processos que mais usam c.p.u, útil para verificar quais processos estão a provocar um uso excessivo de memória e quanta porcentagem de c.p.u cada um usa em dado momento.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandMVIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandMVIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando M V, é utilizado para mover ou renomear arquivos e diretórios.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandCDIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCDIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando C D, é utilizado para fazer a navegação em diretórios. É a abreviatura de <lang xml:lang="en-US">change directory.</lang>';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandRMIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandRMIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando R M, é utilizado para remover um arquivo ou um diretório.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandCATIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCATIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando CAT, é utilizado para abrir um arquivo.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandWIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandWIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Trata-se de um comando utilizado para nos mostrar quem está no sistema, ou que comando cada job está à executar.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandMKDIRIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandMKDIRIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando M K DIR, é utilizado para criar um diretório.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandLOGOUTIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandLOGOUTIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando LOG OUT, é utilizado para deslogar, ou seja, terminar a sessão atual.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandPASSWDIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandPASSWDIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando PASS WD, é utilizado para mudar a senha do usuário com o qual você estiver logado no momento.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandSSHIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandSSHIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando S S H, nos permite logar num servidor remoto através do protocolo S S H.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandCHMODIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCHMODIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando C H MOD, é utilizado para mudar a proteção de um arquivo ou diretório.';
CommandCHOWNIntentHandler
        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandCHOWNIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCHOWNIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando CHOWN, é utilizado para mudar o dono ou grupo de um arquivo ou diretório. Vem de <lang xml:lang="en-US">change owner.</lang>';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandCMPIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandCMPIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando C M P, é utilizado para comparar dois arquivos.'
        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandGREPIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandGREPIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando GREP, é utilizado para procurar um arquivo por um padrão, sendo um filtro bastante útil e usado.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandLNIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandLNIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando L N, é utilizado para criar um link à um arquivo. Link esse, conhecido como link simbólico.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandPINGIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandPINGIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando PÍNGUI, é utilizado para pingar um determinado host, ou seja, enviar pacotes i c m p para um determinado host e medir tempos de resposta, entre outras coisas.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandDATEIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandDATEIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando <lang xml:lang="en-US">DATE</lang>, é utilizado para exibir a data e a hora.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandPWDIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandPWDIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando P.W.D, é utilizado para nos mostrar o caminho por inteiro do diretório em que nos encontramos em dado momento, ou seja, um path name.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandKILLIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandKILLIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O comando KILL, é utilizado para encerrar um programa que não esteja respondendo bem. Ele vai mandar um certo sinal ao aplicativo com mau funcionamento e instruir que ele seja encerrado logo na sequência.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandMANIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandMANIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você conhece o comando <lang xml:lang="en-US">MAN.</lang> ? Trata-se de um manual online. É o comando de ajuda mais utilizado no Linux';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandINFOIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandINFOIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você já ouviu falar do comando INFO ? O comando INFO, é bastante parecido com o comando MAN, trata-se da tentativa de uma nova proposta de manual <lang xml:lang="en-US">on-line.</lang> com novos recursos. Porém, desde sua criação até o presente momento, o comando INFO não obteve muito sucesso. Poucas pessoas utilizam o comando INFO.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandDIFFIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandDIFFIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Comando DIFF, você já ouviu falar ? O comando DIFF, compara o conteúdo de dois arquivos e relata a diferença entre eles. O DIFF, não compara exclusivamente arquivos, ele também pode comparar diretórios ou pastas, e até arquivos compactados.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandDDIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandDDIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você sabe para o que serve o comando DD ? O comando DD, possui o objetivo principal de converter e copiar arquivos. Trata-se de um comando muito utilizado para criar uma imagem a partir de dados existentes em uma mídia ou dispositivo.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandPSIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandPSIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você conhece o comando PS ? O comando PS, é utilizado para mostrar os processos que estão ativos no momento.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandJOBSIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandJOBSIntent';
    },
    handle(handlerInput) {
        const speakOutput = ' Você sabe para que serve o comando JOBS ? O comando JOBS, mostra os processos que estão sendo executados em segundo plano.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandARCHIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandARCHIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Comando arch, você já ouviu falar ? Não, não tem nada a ver com <lang xml:lang="en-US">arch linux.</lang> <say-as interpret-as="interjection">ha ha.</say-as>. O comando arch, É utilizado para mostrar a arquitetura de processamento da máquina.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandLSUSBIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandLSUSBIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você sabe para que serve o comando  L S  U S B ? O comando  L S  U S B, Mostra os dispositivos u s b que estão sendo utilizados.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandWCIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandWCIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Comando WC, você já ouviu falar ? O comando WC, é utilizado para contar as palavras, linhas ou bytes de cada arquivo de entrada e gera o resultado.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CommandLASTIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CommandLASTIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você conhece o comando LAST ? O comando LAST, exibe todas as informações referentes a <lang xml:lang="en-US">log in</lang> e <lang xml:lang="en-US">log out</lang> de usuários do sistema.';

        return handlerInput.responseBuilder
            .speak(speakOutput + finalMessage)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// Fim das Intents relacionadas a comandos específicos *************************************************************

// Melhor distro intent ********************************************************************************

const DistroPrefIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DistroPrefIntent';
    },
    handle(handlerInput) {
        const speakOutput = '<say-as interpret-as="interjection">ô que inferno</say-as>. Toda hora me perguntam isso. Eu já cansei de dizer que a melhor distro, é aquela que roda sobre o kérnel linux. <say-as interpret-as="interjection">bazinga</say-as>.';

        return handlerInput.responseBuilder
            .speak(speakOutput + '<break time="1s"/> Você pode dizer, dicas, se quiser ouvir algumas das minhas dicas relacionadas ao sistema do pingüim. Se quiser sair, diga parar. Ou, me pergunte sobre um comando em específico. Por exemplo: O que faz o comando rm ?')
            .reprompt(speakOutput)
            .getResponse();
    }
};

//******************************************************************************************************

// Indicação de distro intent ********************************************************************************


const DistroIndicationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DistroIndicationIntent';
    },
    handle(handlerInput) {
        const distroIndicationMessage = ['<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você conhece o Ubuntu ? Trata-se de uma distro baseada no Dêbian. É a distro mais popular do universo Linux, amigável e voltada a usuários iniciantes. Teste hoje mesmo numa máquina virtual.',
                                         '<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você já ouviu falar no Linux Mint ? Trata-se de uma distribuição baseada no Ubuntu. É uma das distros mais populares do universo Linux, é amigável, e feita para usuários iniciantes. Você pode testar hoje mesmo numa máquina virtual.',
                                         '<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você conhece o pop ó s ? É uma distribuição baseada no Ubuntu. Tem se tornado bastante popular no universo Linux. É bastante amigável, e voltada a usuários iniciantes. Faça o teste numa máquina virtual.',
                                         '<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você já ouviu falar no Manjaro ? Diferente da maioria, o Manjaro é uma distribuição baseada no <lang xml:lang="en-US">arch linux.</lang>. Tem a sua popularidade dentro do universo Linux. É amigável, e voltada a usuários iniciantes. Você pode testar hoje mesmo numa máquina virtual.',
                                         '<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você conhece o famoso pai de todos ? <amazon:emotion name="disappointed" intensity="high">Não conhece ?</amazon:emotion> Trata-se de uma distribuição linux chamada Dêbian. O Dêbian, não é conhecido como pai de todos por ter sido a primeira distribuição linux a ser desenvolvida, pois ele não foi. ele carrega esse título, por ser a distribuição na qual a grande maioria das outras são baseadas. O Dêbian, está disponível em duas versões, uma versão estável, a qual possui pacotes mais antigos, e uma versão não estável, a qual possui pacotes mais novos. Qual delas usar ? Bom, isso dependerá da sua demanda especificamente. Para finalizar esse nosso papo, eu não recomendaria o Dêbian para iniciantes. trata-se de uma distro a qual demanda um poquinho de experiência. Porém, vale muito a pena fazer um teste numa máquina virtual para começar a se familiarizar. <say-as interpret-as="interjection">ufa</say-as>. Dessa vez eu falei bastante.',
                                         '<say-as interpret-as="interjection">hmmm</say-as>, deixa eu pensar. <break time="2s"/>  Já sei, você já ouviu falar no Fedora ? Digamos que o Fedora é uma versão gratuita e voltada ao usuário doméstico do Red Hat Enterprise Linux. É uma distribução extremamente popular no universo linux, é amigável e voltada a usuários iniciantes. Teste hoje mesmo numa máquina virtual.']
        var distroIndicationMessages = distroIndicationMessage[utils.randomBetWeenTwoNumbers(0, distroIndicationMessage.length - 1)];

        return handlerInput.responseBuilder
            .speak(distroIndicationMessages + '<break time="1s"/> Você pode dizer, dicas, se quiser ouvir algumas das minhas dicas relacionadas ao sistema do pingüim. Se quiser sair, diga parar. Ou, me pergunte sobre um comando em específico. Por exemplo: O que faz o comando diff ?')
            .reprompt(distroIndicationMessages)
            .getResponse();
    }
};



//************************************************************************************************************

const NextPageIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NextPageIntent';
    },
    handle(handlerInput) {
        console.log(`tamanho array Next ${speakOutput.length}`);
        var tips; 
        var firstTip = [utils.randomBetWeenTwoNumbers(0, speakOutput.length - 1)];
        tips =  speakOutput.splice(firstTip,1);
        console.log(`1 ${tips}`);
        if (speakOutput.length > 0) {
            var secondTip = [utils.randomBetWeenTwoNumbers(0, speakOutput.length - 1)];
            var secondItem =  speakOutput.splice(secondTip,1);
            console.log(`2 ${secondItem}`);
            tips += '<break time="1s"/>tenho uma outra dica para você.' + secondItem;
        }
 
        return handlerInput.responseBuilder
            .speak(tips + (speakOutput.length > 0 ? finalMessage : '<break time="1s"/><say-as interpret-as="interjection">mano do céu</say-as>, Você foi longe e ouviu todas as dicas que eu tenho em mente no momento. <say-as interpret-as="interjection">até a próxima</say-as>'))
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .withShouldEndSession(speakOutput.length === 0)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O intuito desta skill, é dar algumas dicas básicas à usuários linux iniciantes. Para interagir comigo, é bem simples, você pode dizer, dicas, se quiser ouvir algumas das minhas dicas relacionadas ao sistema do pingüim. Se quiser sair, diga parar. Ou, me pergunte sobre um comando em específico. Por exemplo: O que faz o comando last ? ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = ' <say-as interpret-as="interjection">perdão</say-as>, não entendi. Você pode dizer próximas para ouvir mais dicas. Parar, se deseja sair, ou, me pergunte sobre um comando em específico. Por exemplo: O que faz o comando cp ?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = ['<say-as interpret-as="interjection">até a próxima.</say-as>. E que os Deuses da computação estejam com você.',
                             'Antes de sair, eu preciso lhe contar um segredo. Aproxime-se de mim por um instante. <amazon:effect name="whispered"> Você não é o usuário mais avançado do mundo apenas por usar o <lang xml:lang="en-US">arch linux.</lang> </amazon:effect> Beijos e até a próxima.',
                             'Espero lhe ver por aqui novamente. Até logo.',
                             'Antes de sair, quero lhe dar uma dica de distribuição linux para você testar. Trata-se de uma distro chamada línuqi smit, é a versão unbutu melhorada, tirado todos os búgui que existe. <say-as interpret-as="interjection">bazinga.</say-as>',
                             'Até a próxima. <amazon:emotion name="excited" intensity="high">E viva o pingüim.</amazon:emotion>',
                             '<say-as interpret-as="interjection">calma</say-as>, Antes de ir embora, tenho mais uma dica bastante interessante para você. Você já conhece O PINGUIM CRIATIVO ? <amazon:emotion name="disappointed" intensity="high">Não conhece ?</amazon:emotion> Então recomendo que você pesquise por PINGUIM CRIATIVO nas redes sociais, e veja o quanto o Linux é bonito. <say-as interpret-as="interjection">até a próxima.</say-as>',
                             '<say-as interpret-as="interjection">adeus</say-as>',
                             '<say-as interpret-as="interjection">atenção</say-as>. Evite o distro hopping. <say-as interpret-as="interjection">até mais ver</say-as>.',
                             '<say-as interpret-as="interjection">bye-bye</say-as>'];
        var goodbyeMessage = speakOutput[utils.randomBetWeenTwoNumbers(0, speakOutput.length - 1)];
        return handlerInput.responseBuilder
            .speak(goodbyeMessage)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NextPageIntentHandler,
        FallbackIntentHandler,
        HelpIntentHandler,
        CommandCPIntentHandler,
        CommandLSIntentHandler,
        CommandDFIntentHandler,
        CommandTOPIntentHandler,
        CommandMVIntentHandler,
        CommandCDIntentHandler,
        CommandRMIntentHandler,
        CommandCATIntentHandler,
        CommandWIntentHandler,
        CommandMKDIRIntentHandler,
        CommandLOGOUTIntentHandler,
        CommandPASSWDIntentHandler,
        CommandSSHIntentHandler,
        CommandCHMODIntentHandler,
        CommandCHOWNIntentHandler,
        CommandCMPIntentHandler,
        CommandGREPIntentHandler,
        CommandLNIntentHandler,
        CommandPINGIntentHandler,
        CommandDATEIntentHandler,
        CommandPWDIntentHandler,
        CommandKILLIntentHandler,
        CommandMANIntentHandler,
        CommandINFOIntentHandler,
        CommandDIFFIntentHandler,
        CommandDDIntentHandler,
        CommandPSIntentHandler,
        CommandJOBSIntentHandler,
        CommandARCHIntentHandler,
        CommandLSUSBIntentHandler,
        CommandWCIntentHandler,
        CommandLASTIntentHandler,
        DistroPrefIntentHandler,
        DistroIndicationIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
