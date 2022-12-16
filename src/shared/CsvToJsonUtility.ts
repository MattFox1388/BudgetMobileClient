export const csvJSON = (csv: string) => {

    const lines=csv.split("\n");
  
    const result = [];
  
    const headers=lines[0].split(",").map(header => replaceAll(header, '"', ''));
  
    for(let i=1;i<lines.length;i++){
  
        const obj = {};
        const currentline=lines[i].split(",").map(header => replaceAll(header, '"', ''));
  
        for(let j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  };

  function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }