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

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
