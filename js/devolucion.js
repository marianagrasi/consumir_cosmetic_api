//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8086/api/devolucion'

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
        let listaDevoluciones = data.devoluciones
        return listaDevoluciones.map(function(devolucion){
            respuesta+=`<tr><td>${devolucion.id_detalle_venta}</td>`+
            `<td>${devolucion.id_producto}</td>`+
            `<td>${devolucion.cantidad_devuelta}</td>`+
            `<td>${devolucion.motivo_devolucion}</td>`+
            `<td>${devolucion.devolver_inventario}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal4" onclick='editar(${JSON.stringify(devolucion)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(devolucion)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}

const registrarDevo = async() =>{
  const validarid_detalle_ventaRespuesta = validarid_detalle_venta();
  const validarid_productoRespuesta = validarid_producto();
  const validarcantidad_devueltaRespuesta = validarcantidad_devuelta();
  const validarmotivo_devolucionRespuesta = validarmotivo_devolucion();

 


    if (validarid_detalle_ventaRespuesta && validarid_productoRespuesta && validarcantidad_devueltaRespuesta && validarmotivo_devolucionRespuesta ){
        let _id_detalle_venta = document.getElementById('id_detalle_venta').value
        let _id_producto = document.getElementById('id_producto').value
        let _cantidad_devuelta = document.getElementById('cantidad_devuelta').value
        let _motivo_devolucion = document.getElementById('motivo_devolucion').value
        let _devolver_inventario = document.getElementById('devolver_inventario').value

        let devolucion = {
            id_detalle_venta : _id_detalle_venta,
            id_producto : _id_producto,
            cantidad_devuelta : _cantidad_devuelta,
            motivo_devolucion : _motivo_devolucion,
            devolver_inventario : _devolver_inventario
        }
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(devolucion),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'La devolución ha sido creada exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'devolucion.html';
            },1000);  
        })
    }
    
}

const validarid_detalle_venta = () => {
  let id_detalle_venta = document.getElementById('id_detalle_venta').value;
  let texto;
  let expresion = /[0-9]/;

  if (id_detalle_venta === null || id_detalle_venta === '' || id_detalle_venta.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El detalle de venta no puede estar vacio</span>';
    document.getElementById('errordetalle_venta').innerHTML = texto;
    return false;
  } else if (!expresion.test(id_detalle_venta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('errordetalle_venta').innerHTML = texto;
    return false;
  } else if (id_detalle_venta.length < 2) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
    document.getElementById('errordetalle_venta').innerHTML = texto;
    return false;
  } else if (id_detalle_venta.length > 10) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
    document.getElementById('errordetalle_venta').innerHTML = texto;
    return false;
  
  }else{
    document.getElementById('errordetalle_venta').innerHTML = '';
    return true;
  }
  
 
  
};

const validarid_producto = () => {
    let id_producto = document.getElementById('id_producto').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (id_producto === null || id_producto === '' || id_producto.length === 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El id producto no puede estar vacio</span>';
      document.getElementById('errorid_producto').innerHTML = texto;
      return false;
    } else if (!expresion.test(id_producto)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
      document.getElementById('errorid_producto').innerHTML = texto;
      return false;
    } else if (id_producto.length < 2) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
      document.getElementById('errorid_producto').innerHTML = texto;
      return false;
    } else if (id_producto.length > 10) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
      document.getElementById('errorid_producto').innerHTML = texto;
      return false;
    
    }else{
      document.getElementById('errorid_producto').innerHTML = '';
      return true;
    }
    
   
    
};
const validarcantidad_devuelta = () => {
    let cantidad_devuelta = document.getElementById('cantidad_devuelta').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (cantidad_devuelta === null ||cantidad_devuelta === '' ||cantidad_devuelta === 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cantidad no puede estar vacia</span>';
      document.getElementById('errorcantidad_devuelta').innerHTML = texto;
      return false;
    } else if (!expresion.test(cantidad_devuelta)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
      document.getElementById('errorcantidad_devuelta').innerHTML = texto;
      return false;
    } else if (cantidad_devuelta.length < 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
      document.getElementById('errorcantidad_devuelta').innerHTML = texto;
      return false;
    } else if (cantidad_devuelta.length > 100) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
      document.getElementById('errorcantidad_devuelta').innerHTML = texto;
      return false;
    
    }else{
      document.getElementById('errorcantidad_devuelta').innerHTML = '';
      return true;
    }
    
   
    
};

validarmotivo_devolucion = () => {
    let motivo_devolucion = document.getElementById('motivo_devolucion').value
    let texto;
    
  
    if ( motivo_devolucion === null ||  motivo_devolucion === '' ||  motivo_devolucion.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el motivo de la devolucion</span>';
      document.getElementById('errormotivo_devolucion').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errormotivo_devolucion').innerHTML = '';
      return true;
    }
};



  const ActualizarRegistroDevo = async() =>{
    const validarid_detalle_ventaRespuesta1 = validarid_detalle_venta1();
    const validarid_productoRespuesta1 = validarid_producto1();
    const validarcantidad_devueltaRespuesta1 = validarcantidad_devuelta1();
    const validarmotivo_devolucionRespuesta1 = validarmotivo_devolucion1();
  

    if (validarid_detalle_ventaRespuesta1 && validarid_productoRespuesta1 && validarcantidad_devueltaRespuesta1 && validarmotivo_devolucionRespuesta1){
      let _id_detalle_venta1 = document.getElementById('id_detalle_venta1').value
      let _id_producto1 = document.getElementById('id_producto1').value
      let _cantidad_devuelta1 = document.getElementById('cantidad_devuelta1').value
      let _motivo_devolucion1 = document.getElementById('motivo_devolucion1').value
      let _devolver_inventario1 = document.getElementById('devolver_inventario1').value


      let _devolucion = {
        id_detalle_venta : _id_detalle_venta1,
        id_producto : _id_producto1,
        cantidad_devuelta : _cantidad_devuelta1,
        motivo_devolucion : _motivo_devolucion1,
        devolver_inventario : _devolver_inventario1
    }
        fetch(url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_devolucion),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'La devolucion ha sido modificada exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'devolucion.html';
            },1000);  
        })
    }
    
}
const validarid_detalle_venta1 = () => {
  let id_detalle_venta = document.getElementById('id_detalle_venta1').value;
  let texto;
  let expresion = /[0-9]/;

  if (id_detalle_venta === null || id_detalle_venta === '' || id_detalle_venta.length === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El detalle de venta no puede estar vacio</span>';
    document.getElementById('errordetalle_venta1').innerHTML = texto;
    return false;
  } else if (!expresion.test(id_detalle_venta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('errordetalle_venta1').innerHTML = texto;
    return false;
  } else if (id_detalle_venta.length < 2) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
    document.getElementById('errordetalle_venta1').innerHTML = texto;
    return false;
  } else if (id_detalle_venta.length > 10) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
    document.getElementById('errordetalle_venta1').innerHTML = texto;
    return false;
  
  }else{
    document.getElementById('errordetalle_venta1').innerHTML = '';
    return true;
  }
  
 
  
};

const validarid_producto1 = () => {
    let id_producto = document.getElementById('id_producto1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (id_producto === null || id_producto === '' || id_producto.length === 0) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">El id producto no puede estar vacio</span>';
      document.getElementById('errorid_producto1').innerHTML = texto;
      return false;
    } else if (!expresion.test(id_producto)) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
      document.getElementById('errorid_producto1').innerHTML = texto;
      return false;
    } else if (id_producto.length < 2) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
      document.getElementById('errorid_producto1').innerHTML = texto;
      return false;
    } else if (id_producto.length > 10) {
      texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 10 caracteres</span>';
      document.getElementById('errorid_producto1').innerHTML = texto;
      return false;
    
    }else{
      document.getElementById('errorid_producto1').innerHTML = '';
      return true;
    }
    
   
    
};







validarmotivo_devolucion1 = () => {
    let motivo_devolucion = document.getElementById('motivo_devolucion1').value
    let texto;
    
  
    if ( motivo_devolucion === null ||  motivo_devolucion === '' ||  motivo_devolucion.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el motivo de la devolucion</span>';
      document.getElementById('errormotivo_devolucion1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errormotivo_devolucion1').innerHTML = '';
      return true;
    }
}

const validarcantidad_devuelta1 = () => {
  let cantidad_devuelta = document.getElementById('cantidad_devuelta1').value;
  let texto;
  let expresion = /[0-9]/;

  if (cantidad_devuelta === null ||cantidad_devuelta === '' ||cantidad_devuelta === 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">La cantidad no puede estar vacia</span>';
    document.getElementById('errorcantidad_devuelta1').innerHTML = texto;
    return false;
  } else if (!expresion.test(cantidad_devuelta)) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo caracteres válidos (números)</span>';
    document.getElementById('errorcantidad_devuelta1').innerHTML = texto;
    return false;
  } else if (cantidad_devuelta < 0) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser mayor a 2 caracteres</span>';
    document.getElementById('errorcantidad_devuelta1').innerHTML = texto;
    return false;
  } else if (cantidad_devuelta > 100) {
    texto = '<span style="color: #fff; background-color: #e6213f; padding: 3px;border-radius: 3px;">Debe ser menor a 100 caracteres</span>';
    document.getElementById('errorcantidad_devuelta1').innerHTML = texto;
    return false;
  
  }else{
    document.getElementById('errorcantidad_devuelta1').innerHTML = '';
    return true;
  }
  
 
  
};





  const editar = (devolucion) => {


    document.getElementById('id_detalle_venta1').value = devolucion.id_detalle_venta;
    document.getElementById('id_producto1').value = devolucion.id_producto;
    document.getElementById('cantidad_devuelta1').value = devolucion.cantidad_devuelta;
    document.getElementById('motivo_devolucion1').value =devolucion.motivo_devolucion;
    document.getElementById('devolver_inventario1').value = devolucion.devolver_inventario;
    
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
            let devolucion = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(devolucion),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminada!',
                    'La devolucion ha sido eliminada.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'devolucion.html';
                },1000);  
            })
        }
      })
    }


if(document.querySelector('#btnRegistrar')){
        document.querySelector('#btnRegistrar')
        .addEventListener('click',registrarDevo)
}
  
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click',ActualizarRegistroDevo)
}