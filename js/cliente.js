//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8086/api/cliente'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url,{
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp)=> resp.json())
    .then(function(data){
        let listaClientes = data.clientes
        return listaClientes.map(function(cliente){
            respuesta+=`<tr><td>${cliente.nit_cedula}</td>`+
            `<td>${cliente.nombre}</td>`+
            `<td>${cliente.apellido}</td>`+
            `<td>${cliente.correo}</td>`+
            `<td>${cliente.direccion}</td>`+
            `<td>${cliente.telefono}</td>`+
            `<td>${cliente.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal8" onclick='editar(${JSON.stringify(cliente)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(cliente)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}

const registrarCliente = async() =>{
  const validarCedulaRespuesta = validarCedula();
  const validarNombreRespuesta = validarNombre();
  const validarApellidoRespuesta = validarApellido();
  const validarCorreoRespuesta = validarCorreo();
  const validarTelefonoRespuesta = validarTelefono();
  const validarDireccionRespuesta = validarDireccion();

 



  if ( validarCedulaRespuesta && validarNombreRespuesta && validarApellidoRespuesta && 
    validarTelefonoRespuesta && validarCorreoRespuesta && validarDireccionRespuesta){
      let _nit_cedula = document.getElementById('nit_cedula').value
      let _nombre = document.getElementById('nombre').value
      let _apellido = document.getElementById('apellido').value
      let _correo = document.getElementById('correo').value
      let _telefono = document.getElementById('telefono').value
      let _direccion = document.getElementById('direccion').value
      let _estado = document.getElementById('estado').value

      let cliente = {
        nit_cedula:_nit_cedula,
        nombre :_nombre,
        apellido:_apellido,
        correo :_correo,
        telefono :_telefono,
        direccion:_direccion,
        estado:_estado
      }
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(cliente),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'El cliente ha sido creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'cliente.html';
            },1000);  
        })
    }
    
}
const validarCedula = () => {
  let cedula = document.getElementById('nit_cedula').value;
  let texto;
  let expresion = /[0-9]/;

  if (cedula === null || cedula === '' || cedula.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cédula no puede estar vacia</span>';
    document.getElementById('errornit_cedula').innerHTML = texto;
    return false;
  } else if (!expresion.test(cedula)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('errornit_cedula').innerHTML = texto;
    return false;
  } else if (cedula.length < 3) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 3 caracteres</span>';
    document.getElementById('errornit_cedula').innerHTML = texto;
    return false;
  } else if (cedula.length > 10) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
    document.getElementById('errornit_cedula').innerHTML = texto;
    return false;
  
  }else{
    document.getElementById('errornit_cedula').innerHTML = '';
    return true;
  }
  
 
  
};


validarDireccion = () => {
    let direccion = document.getElementById('direccion').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!direccion) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
        document.getElementById('errordireccion').innerHTML = texto;
        return false;
    } else if (direccion.length < 3) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
        document.getElementById('errordireccion').innerHTML = texto;
        return false;
    } else if (!expresion.test(direccion)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
        document.getElementById('errordireccion').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errordireccion').innerHTML = '';
      return true;
    } 
};

//validar nombre 


validarNombre = () => {
    let nombre = document.getElementById('nombre').value
    let texto;
    
  
    if (nombre === null || nombre === '' || nombre.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del cliente</span>';
      document.getElementById('errornombre').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errornombre').innerHTML = '';
      return true;
    }
}

//Validar apellido
validarApellido = () => {
  let apellido = document.getElementById('apellido').value
  let texto;
  

  if (apellido === null || apellido === '' || apellido.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el apellido del cliente</span>';
    document.getElementById('errorapellido').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorapellido').innerHTML = '';
    return true;
  }
}

const validarCorreo = () => {
  let correo = document.getElementById('correo').value.trim();
  let texto;
  let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correo) {
    
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El correo no puede estar vacio</span>';
      document.getElementById('errorcorreo').innerHTML = texto;
      return false;
  } else if (!expresion.test(correo)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de correo debe ser válida</span>';
      document.getElementById('errorcorreo').innerHTML = texto;
      return false;
  }else {
    document.getElementById('errorcorreo').innerHTML = '';
    return true;

  }


};
const validarTelefono = () => {
  let telefono = document.getElementById('telefono').value.trim();
  let texto;
  let expresion = /^[0-9]+$/;

  if (!telefono) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El telefono no puede estar vacio</span>';
      document.getElementById('errortelefono').innerHTML = texto;
      return false;
  } else if (telefono.length < 10) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El numero debe tener mas de 9 digitos</span>';
      document.getElementById('errortelefono').innerHTML = texto;
      return false;
  } else if (!expresion.test(telefono)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten números</span>';
      document.getElementById('errortelefono').innerHTML = texto;
      return false;
  }else{
    document.getElementById('errortelefono').innerHTML = '';
    return true;
  }
 
 
};





  const ActualizarRegistroCliente = async() =>{
    const validarCedulaRespuesta1 = validarCedula1();
    const validarNombreRespuesta1 = validarNombre1();
    const validarApellidoRespuesta1 = validarApellido1();
    const validarCorreoRespuesta1 = validarCorreo1();
    const validarTelefonoRespuesta1 = validarTelefono1();
    const validarDireccionRespuesta1 = validarDireccion1();
  
  


    if ( validarCedulaRespuesta1 && validarNombreRespuesta1 && validarApellidoRespuesta1 && 
      validarTelefonoRespuesta1 && validarCorreoRespuesta1 && validarDireccionRespuesta1){
        let _nit_cedula1 = document.getElementById('nit_cedula1').value
        let _nombre1 = document.getElementById('nombre1').value
        let _apellido1 = document.getElementById('apellido1').value
        let _correo1 = document.getElementById('correo1').value
        let _telefono1 = document.getElementById('telefono1').value
        let _direccion1 = document.getElementById('direccion1').value
        let _estado1 = document.getElementById('estado1').value
  


        let _cliente = {
          nit_cedula:_nit_cedula1,
          nombre :_nombre1,
          apellido :_apellido1,
          correo:_correo1,
          telefono :_telefono1,
          direccion:_direccion1,
          estado:_estado1
        }
        fetch(url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_cliente),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'El cliente ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'cliente.html';
            },1000);  
        })
    }
    
}

const validarCedula1 = () => {
  let cedula = document.getElementById('nit_cedula1').value;
  let texto;
  let expresion = /[0-9]/;

  if (cedula === null || cedula === '' || cedula.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cédula no puede estar vacia</span>';
    document.getElementById('errornit_cedula1').innerHTML = texto;
    return false;
  } else if (!expresion.test(cedula)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('errornit_cedula1').innerHTML = texto;
    return false;
  } else if (cedula.length < 3) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 3 caracteres</span>';
    document.getElementById('errornit_cedula1').innerHTML = texto;
    return false;
  } else if (cedula.length > 10) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
    document.getElementById('errornit_cedula1').innerHTML = texto;
    return false;
  
  }else{
    document.getElementById('errornit_cedula1').innerHTML = '';
    return true;
  }
  
 
  
};


validarDireccion1 = () => {
    let direccion = document.getElementById('direccion1').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!direccion) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
        document.getElementById('errordireccion1').innerHTML = texto;
        return false;
    } else if (direccion.length < 3) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
        document.getElementById('errordireccion1').innerHTML = texto;
        return false;
    } else if (!expresion.test(direccion)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
        document.getElementById('errordireccion1').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errordireccion1').innerHTML = '';
      return true;
    } 
};

//validar nombre 


validarNombre1 = () => {
    let nombre = document.getElementById('nombre1').value
    let texto;
    
  
    if (nombre === null || nombre === '' || nombre.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del cliente</span>';
      document.getElementById('errornombre1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errornombre1').innerHTML = '';
      return true;
    }
}

//Validar apellido
validarApellido1 = () => {
  let apellido = document.getElementById('apellido1').value
  let texto;
  

  if (apellido === null || apellido === '' || apellido.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el apellido del cliente</span>';
    document.getElementById('errorapellido1').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorapellido1').innerHTML = '';
    return true;
  }
}

const validarCorreo1 = () => {
  let correo = document.getElementById('correo1').value.trim();
  let texto;
  let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correo) {
    
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El correo no puede estar vacio</span>';
      document.getElementById('errorcorreo1').innerHTML = texto;
      return false;
  } else if (!expresion.test(correo)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de correo debe ser válida</span>';
      document.getElementById('errorcorreo1').innerHTML = texto;
      return false;
  }else {
    document.getElementById('errorcorreo1').innerHTML = '';
    return true;

  }


};
const validarTelefono1 = () => {
  let telefono = document.getElementById('telefono1').value.trim();
  let texto;
  let expresion = /^[0-9]+$/;

  if (!telefono) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El telefono no puede estar vacio</span>';
      document.getElementById('errortelefono1').innerHTML = texto;
      return false;
  } else if (telefono.length < 10) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El numero debe tener mas de 9 digitos</span>';
      document.getElementById('errortelefono1').innerHTML = texto;
      return false;
  } else if (!expresion.test(telefono)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Solo se admiten números</span>';
      document.getElementById('errortelefono1').innerHTML = texto;
      return false;
  }else{
    document.getElementById('errortelefono1').innerHTML = '';
    return true;
  }
 
 
};






  const editar = (cliente) => {


    document.getElementById('nit_cedula1').value = cliente.nit_cedula;
    document.getElementById('nombre1').value = cliente.nombre;
    document.getElementById('apellido1').value = cliente.apellido;
    document.getElementById('correo1').value =cliente.correo;
    document.getElementById('direccion1').value = cliente.direccion;
    document.getElementById('telefono1').value = cliente.telefono;
    document.getElementById('estado1').value = cliente.estado;
    
  }

  const eliminar = (id) =>{

    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let cliente = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(cliente),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'El cliente ha sido eliminado.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'cliente.html';
                },1000);  
            })
        }
      })
    }


if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar')
        .addEventListener('click',registrarCliente)
}
  
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click',ActualizarRegistroCliente)
}