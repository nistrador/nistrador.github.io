var temporaryPermissionStatus = "";

function polling(ambiente) {
  if (temporaryPermissionStatus !== Notification.permission) {
    temporaryPermissionStatus = Notification.permission;
alert('temporaryPermissionStatus',temporaryPermissionStatus);
    if (leitorJaConfigurouNotificacoes()) {
    console.log("não vamos beber, mas a permissão é " + temporaryPermissionStatus);
    }
  }
  if (! leitorJaConfigurouNotificacoes()) {
    setTimeout(function() { polling(ambiente); }, 500);
  }
  else {
    setTimeout(function() { finalizaSubscricao(ambiente); }, 500);
  }
}

function inicializaOneSignal()
{
  var OneSignal = window.OneSignal || [];
  OneSignal.push(["init", {
    appId: "b4d189a8-3ad8-497b-93ec-b50bfa590a8e",
    autoRegister: true, /* Set to true to automatically prompt visitors */
    welcomeNotification: {
      title: "Notificações O GLOBO",
      message: "Obrigado! Agora você será notificado sempre que houver notícias importantes para manter-se informado."
    },
    notifyButton: {
      enable: false /* Set to false to hide */
    }
  }]);
	console.log("teste");
}

function navegadorSuportaNotificacao() {
  if ("Notification" in window)
    return true;
  else
    return false;
}

function leitorJaConfigurouNotificacoes() {
	if (navegadorSuportaNotificacao()) {
		if (Notification.permission !== "default")
			return true;
	}
	return false;
}

function leitorIraVisualizarModalNovamente() {
  var resultado = true;
  if (! navegadorSuportaNotificacao())
    resultado = false;
  if (leitorJaConfigurouNotificacoes())
    resultado = false;
    
  return resultado;
}

function getPermissaoLeitorNotificacaoNoSeguroOGlobo() { 
  var resultado = "default";
  if (window.navigator != null) {
    if (navigator.serviceWorker != null && navigator.serviceWorker != 'undefined') {
      resultado = Notification.permission;
    }		
  }
  return resultado;
}

function leitorNegouNotificacao() {
  return "denied" === getPermissaoLeitorNotificacaoNoSeguroOGlobo();
}

function finalizaSubscricao(ambiente) {
  if (leitorJaConfigurouNotificacoes()) {
    window.location.href = "notificacao/oglobo_" + ambiente + "_cadastrar.html";
  }
}

function subscrever(ambiente) {
  inicializaOneSignal();
  polling(ambiente);
}

function subscreverWeb() {
  subscrever("web");
}

function subscreverMobi() {
  subscrever("mobi");
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
