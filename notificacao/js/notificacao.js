function navegadorSuportaNotificacao() {
  return ("Notification" in window);
}

function leitorJaConfigurouNotificacoes() {
	if (seNavegadorSuportaNotificacao()) {
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

function subscrever() {
  if (navigator.serviceWorker.ready) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    Notification.requestPermission().then(function(permission) {
      window.location.reload();
    });
  }
}
