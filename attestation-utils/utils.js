function orderList(lista){
	if(lista==null || lista==undefined || lista.length==0){
		return null;
	}else{
		var n=lista.length;
		var n, i, k, aux;
		for (k = 1; k < n; k++) {
			for (i = 0; i < (n - k); i++) {
				if (lista[i].sort > lista[i + 1].sort) {
					aux = lista[i];
					lista[i] = lista[i + 1];
					lista[i + 1] = aux;
				}
			}
		}
		return lista;
	}						
}
function getStatusInvoices(){
	return [{value:"PAY", name:"PAGADA"},{value:"NOPAY", name:"NO PAGADA"},{value:"IN_PROCESS", name:"EN PROCESO"}];
}
function formattingDate(date) {
	date = replaceAll(date, "T", " ");
	var newDate = new Date(date);
	var hora = "00";
	var minutos = "00";
	if (newDate.getHours() < 10) {
		hora = "0" + newDate.getHours();
	} else {
		hora = newDate.getHours();
	}
	if (newDate.getMinutes() < 10) {
		minutos = "0" + newDate.getMinutes();
	} else {
		minutos = newDate.getMinutes();
	}
	var dia = newDate.getDate();
	if (dia < 10) {
		dia = "0" + newDate.getDate();
	}
	var mes=newDate.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	var dateFormatting = dia + '-' + mes + '-' + newDate.getFullYear() + ' ' + hora + ':' + minutos;
	return dateFormatting;
}
function replaceAll(text, busca, reemplaza) {
	if (text == null || text == undefined) {
	  return text;
	} else {
	  while (text.toString().indexOf(busca) != -1)
		text = text.toString().replace(busca, reemplaza);
	  return text;
	}
  }
  function formattingIntegerPart(integerPart) {
	var auxCaracter = "";
	var isNegative = false;
	auxCaracter = integerPart.charAt(0);
	var enteroAux = integerPart;
	if (auxCaracter == '-') {
	  integerPart = integerPart.substring(1, integerPart.length);
	  isNegative = true;
	  isNegative = true;
	}
	var cadena = '';
	var posicion = 0;
	if (integerPart.length > 3) {
	  for (var i = 0; i < integerPart.length; i++) {
		if (i == 0) {
		  posicion = integerPart.length;
		}
		if (posicion <= 3) {
		  cadena = integerPart.substring(0, posicion) + cadena;
		  if (isNegative) {
			cadena = '-' + cadena;
		  }
		  return cadena;
		} else {
		  cadena = '.' + integerPart.substring(posicion - 3, posicion) + cadena;
		  posicion = posicion - 3;
		}
	  }
	} else {
	  cadena = integerPart;
	}
	if (isNegative) {
	  cadena = '-' + cadena;
	}
	return cadena;
  }
function amountFormattingObject(amount) {
	var retorno = {
	  integerPart: '',
	  decimalPart: ''
	};
	var monto = (amount).toFixed(2);
	var parteDecimal = '';
	var parteEntera = '';
	if (monto.toString().indexOf('.') > 0) {
	  var array = monto.toString().split('.');
	  parteEntera = array[0];
	  if (array[1].length < 2) {
		parteDecimal = array[1] + '0';
	  } else {
		parteDecimal = array[1];
	  }
	} else {
	  parteEntera = monto.toString();
	  parteDecimal = '00';
	}
	retorno.integerPart = formattingIntegerPart(parteEntera);
	retorno.decimalPart = parteDecimal;
	return retorno;
  }
  

function validarLetrasNumerosSimplesGuionesPiso(data) {
	var patron = /^([a-zA-Z-Z]|[0-9]|-|_|\\*|\\.|\\,|;)*$/;
	if (patron.test(data))
	  return true;
	else
	  return false;
}

function menu(){
	
	const sidebar = document.querySelector('.sidebar');
	const main = document.querySelector('.main');
	const mein = document.querySelector('.mein');
	var mediaQuery = window.matchMedia('(max-width: 1199px)'); // Verificar si el ancho de la pantalla es menor a md

	if (mediaQuery.matches) {
		if (sidebar.style.left === '-300px' || sidebar.style.left === '') {
			sidebar.style.left = '0px';
			mein.style.width = '100%';
		  } else {
			sidebar.style.left = '-300px';
			mein.style.width = '100%';
		  }
	}else{
		if (sidebar.style.left === '0px' || sidebar.style.left === '') {
			sidebar.style.left = '-300px';
			main.style.left = '-300px';
			mein.style.width = '100%';
		  } else {
			sidebar.style.left = '0px';
			main.style.left = '0px';
			mein.style.width = '80%';
		  }
	}

  
	  

}
