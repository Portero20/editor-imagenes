const fileInput = document.querySelector(".file-input");
const previewImg = document.querySelector(".preview-img img");
const chooseImgBtn = document.querySelector(".choose-img");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");


//variable para los filtros
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

//variable para el boton de rotar
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


//función para que funcionen cada uno de los filtros, le pasamos su valor correspondiente a cada propiedad con los ``
//Brightness = opacidad, saturate = saturación, invert = invertir colores, grayscale = escala de grises

const applyFilters = () => {

    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`; //aplicamos el estilo para que rote a -90 y para el scale
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`; //aplicamos estilos para los filtros

}


//función para cargar la imagen

const loadImage = () => {

    let file = fileInput.files[0]; //obtener el archivo que selecciono el usuario

    if(!file) return; //retorna el if si el usuario no selecciono nada

    previewImg.src = URL.createObjectURL(file); //pasamos el archivo url a la preview de la imagen

    previewImg.addEventListener("load", () => {

        resetFilterBtn.click(); //cuando seleccionemos una nueva imagen los filtros se resetearan

        document.querySelector(".container").classList.remove("disable") //cuando suba un archivo se sacara la opacidad

    })

}

//funcion para recorrer cada uno de los filtros

filterOptions.forEach(option => {

    option.addEventListener("click", () => { //añadimos un add event listener para todos los filtros

        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");

        filterName.innerText = option.innerText; //me dice el nombre del boton que yo aprete


        //Me mantiene el valor de los filtros segun el rango que haya elegido
        if(option.id === "brightness"){

            filterSlider.max = "200"; //el valor maximo es de 200
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;

        }else if(option.id === "saturation"){

            filterSlider.max = "200"; //el valor maximo es de 200
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;

        }else if(option.id === "inversion"){

            filterSlider.max = "100"; //el valor maximo es de 200
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;

        }else{

            filterSlider.max = "100"; //el valor maximo es de 100
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;

        }

    });

});

//función para el input de rango

const updateFilter = () =>{

    filterValue.innerText = `${filterSlider.value}%` //me va cambiando el rango del input
    const selectedFilter = document.querySelector(".filter .active"); //obtiene el filtro seleccionado

    if(selectedFilter.id === "brightness"){

        brightness = filterSlider.value; //si es true la opacidad va a cambiar con el valor del slider del rango

    }else if(selectedFilter.id === "saturation"){

        saturation = filterSlider.value; //si aprieto saturacion, cambiara la saturacion

    }else if(selectedFilter.id === "inversion"){


        inversion = filterSlider.value;


    }else{

        grayscale = filterSlider.value; // si aprieto grayscale, cambiara la escala de grises

    }

    applyFilters(); //llamamos a la función para que me la ejecute y muestro los cambios

}


//funcion para rotar la imagen

rotateOptions.forEach(option => {

    option.addEventListener("click", () => { //añadimos el evento click para los botones de rotar

        if(option.id === "left"){ //si el id es igual a left

            rotate -= 90; //rotara en -90deg

        }else if(option.id === "right"){

            rotate += 90; //rotara a 90deg

        }else if(option.id === "horizontal"){

            flipHorizontal = flipHorizontal === 1 ? -1 : 1; //aplicamos operador ternario, el valor es 1, si es true me lo setea en 1 y si no en -1

        }else{

            flipVertical = flipVertical === 1 ? -1 : 1; //aplicamos operador ternario, el valor es 1, si es true me lo setea en 1 y si no en -1
            
        }

        applyFilters(); //llamamos a la función para que lo muestre

    })

})


//funcion para resetear los filtros

const resetFilter = () =>{

    //reseteamos todos los valores de las variables a su valor por defecto

    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

    rotate = 0, flipHorizontal = 1, flipVertical = 1;

    filterOptions[0].click(); //cuando hacemos click en reset, se hara reset de todos los valores y por defecto quedara seleccionado el boton de opacidad

    applyFilters();

}

//funcion para descargar la imagen

const saveImage = () => {

    const canvas = document.createElement("canvas"); //crear canvas para el elemento

    const ctx = canvas.getContext("2d") //canvas.getContext retorna un contexto dibujado del canvas

    canvas.width = previewImg.naturalWidth; //seteamos el canvas con el width actual de la imagen
    canvas.height = previewImg.naturalHeight; //seteamos el canvas con el height actual de la imagen

    ctx.translate(canvas.width / 2,canvas.height / 2); //trasladar canvas al centro

    if(rotate !== 0){ //si es distinto de cero

        ctx.rotate(rotate * Math.PI / 180);

    }

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`; //aplicamos los filtros que el usuario selecciono al canvas
    ctx.scale(flipHorizontal, flipVertical); //guarda flip canvas / vertical canvas
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2 , canvas.width,canvas.height); //guardamos la información



    const link = document.createElement("a") //creamos etiqueta a para descargar la imagen

    link.download = "image.jpg"; //le pasamos a la etiqueta a el valor de image.jpg

    link.href = canvas.toDataURL(); //le pasamos a la etiqueta a el valor de la URL del canvas

    link.click(); //al hacer click me descargar la imagen

}

//evento para descargar la imagen

saveImgBtn.addEventListener("click", saveImage)

//evento para resetear todos los filtros
resetFilterBtn.addEventListener("click", resetFilter);

//evento para actualizar el filtro
filterSlider.addEventListener("input",updateFilter);

//evento para cargar la imagen
fileInput.addEventListener("change", loadImage);

//Cuando haga click en subir imagen aparece la ventana de archivos para poder seleccionar la imagen
chooseImgBtn.addEventListener("click", () => {

    fileInput.click()
});

