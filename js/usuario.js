//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8086/api/usuario'

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
        let listaUsuarios = data.usuarios
        return listaUsuarios.map(function(usuario){
            respuesta+=`<tr><td>${usuario.nombre}</td>`+
            `<td>${usuario.correo}</td>`+
            `<td>${usuario.password}</td>`+
            `<td>${usuario.rol}</td>`+
            `<td>${usuario.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal6" onclick='editar(${JSON.stringify(usuario)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(usuario)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}

const registrarUsuario = async() =>{
  const validarnombreRespuesta = validarnombre();
  const validarcorreoRespuesta = validarcorreo();
  const validarpasswordRespuesta = validarpassword();


 


    if (validarnombreRespuesta  && validarcorreoRespuesta && validarpasswordRespuesta  ){
        let _nombre = document.getElementById('nombre').value
        let _correo = document.getElementById('correo').value
        let _password = document.getElementById('password').value
        let _rol = document.getElementById('rol').value
        let _estado = document.getElementById('estado').value

        let usuario = {
            nombre : _nombre,
            correo : _correo,
            password : _password,
            rol : _rol,
            estado : _estado
        }
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(usuario),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'El usuario ha sido creado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'usuario.html';
            },1000);  
        })
    }
    
}




validarnombre = () => {
    let nombre = document.getElementById('nombre').value
    let texto;
    
  
    if ( nombre === null ||   nombre === '' ||   nombre.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del usuario</span>';
      document.getElementById('errornombre').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errornombre').innerHTML = '';
      return true;
    }
};

const validarcorreo = () => {
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

validarpassword = () => {
    let password = document.getElementById('password').value
    let texto;
    
  
    if ( password === null ||   password=== '' ||  password.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del usuario</span>';
      document.getElementById('errorpassword').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorpassword').innerHTML = '';
      return true;
    }
};



  const ActualizarRegistroUsuario = async() =>{
    const validarnombreRespuesta1 = validarnombre1();
    const validarcorreoRespuesta1 = validarcorreo1();
    const validarpasswordRespuesta1 = validarpassword1();
  
  

    if (validarnombreRespuesta1  && validarcorreoRespuesta1 && validarpasswordRespuesta1){
        let _nombre1 = document.getElementById('nombre1').value
        let _correo1 = document.getElementById('correo1').value
        let _password1 = document.getElementById('password1').value
        let _rol1 = document.getElementById('rol1').value
        let _estado1 = document.getElementById('estado1').value


        let _usuario = {
            nombre : _nombre1,
            correo : _correo1,
            password : _password1,
            rol : _rol1,
            estado : _estado1
        }
        fetch(url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_usuario),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'El usuario ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'usuario.html';
            },1000);  
        })
    }
    
}

validarnombre1 = () => {
    let nombre = document.getElementById('nombre1').value
    let texto;
    
  
    if ( nombre === null ||   nombre === '' ||   nombre.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del usuario</span>';
      document.getElementById('errornombre1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errornombre1').innerHTML = '';
      return true;
    }
};

const validarcorreo1 = () => {
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

validarpassword1 = () => {
    let password = document.getElementById('password1').value
    let texto;
    
  
    if ( password === null ||   password=== '' ||  password.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del usuario</span>';
      document.getElementById('errorpassword1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorpassword1').innerHTML = '';
      return true;
    }
};






const editar = (usuario) => {


    document.getElementById('nombre1').value = usuario.nombre;
    document.getElementById('correo1').value = usuario.correo;
    document.getElementById('password1').value = usuario.password;
    document.getElementById('rol1').value =usuario.rol;
    document.getElementById('estado1').value = usuario.estado;
    
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
            let usuario = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(usuario),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'usuario.html';
                },1000);  
            })
        }
      })
    }


if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar')
        .addEventListener('click',registrarUsuario)
}
  
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click',ActualizarRegistroUsuario)
}