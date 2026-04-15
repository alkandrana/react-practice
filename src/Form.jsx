export default function Form(object){
    const datatypes = {};
    for (let key in object){
        if (object[key]) {
            datatypes[key] = typeof (object[key]);
        }
    }
    return datatypes;
}