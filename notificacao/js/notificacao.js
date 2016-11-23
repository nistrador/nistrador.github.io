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

function subscrever(ambiente) {
  if (navigator.serviceWorker.ready) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    Notification.requestPermission().then(function(permission) {
      window.location.href = "oglobo_" + ambiente + "_cadastrar.html";
    });
  }
}

function subscreverWeb() {
  subscrever("web");
}

function subscreverMobi() {
  subscrever("mobi");
}

