let listArMn = [];
function buttonPress()
{
    let infoWhatAllTable = "";
    for(let i = 0; i < listArMn.length; i++)
    {
        infoWhatAllTable = infoWhatAllTable + listArMn[i];
    }
    if(listArMn.length >= 1)
    {
        
        let content = "Laiks,Globalais laiks,Komandas nosaukums,Spēlētaja vārds,Punktus ieguva,Esošais spēles rezultāts" + infoWhatAllTable;
    
        // const csvBlob = new Blob(["1, 5"]);
        const csvBlob = new Blob([content]);
    
        a2.download = "basketbolaDatuIevads.csv";
    
        a2.href = URL.createObjectURL(csvBlob);
    
        a2.click();

        Swal.fire(
        'Fails tika lejupieladets!',
        'Poga bija uzspiesta!',
        'success'
        )
    }
    else
    {
        Swal.fire({
          icon: 'error',
          title: 'Uzspied pogu pievienot iemetienu sakumā!',
          text: '',
        })
    }
}
function newVrInp()
{
    let valTime = document.getElementById("inputTime").value;
    let valTeamName = document.getElementById("inputTeamName").value;
    let valName = document.getElementById("inputSAname").value;
    let valPointsGet = document.getElementById("optionPoints").value;
    let valTeamEsos = document.getElementById("teamEs").value;
    let valTeamAnother = document.getElementById("teamAn").value;

    let $select = document.querySelector("#optionPoints");

    let currentdate = new Date(); 
    let datetime = + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    

    if(valTime.length < 2 || valTeamName.length < 2 || valName.length < 2|| valTeamEsos.length < 1|| valTeamAnother.length < 1)
    {
        Swal.fire({
            icon: 'error',
            title: '<b style="font-family:arial;">Enter all gaps!</b>',
            text: 'You must to complete all gaps before downloading!',
        })
        return;
    }
    let gameResult = valTeamEsos + ":" + valTeamAnother;
    let whTP = "\n" + valTime + "," + datetime + "," + valTeamName + "," + valName + "," + valPointsGet + "," + gameResult;
    listArMn.push(whTP);

    // localStorage.setItem("basketball", listArMn);
    saveDataToLocalStorage('massiveData', listArMn);

    Swal.fire({
    icon: 'info',
    title: 'Bija pielikts iemetiens!',
    text: 'Bija nospiesta poga!',})

    document.getElementById("inputTime").value = "";
    document.getElementById("inputTeamName").value = "";
    document.getElementById("inputSAname").value = "";
    $select.value = 1;
    document.getElementById("teamEs").value = "";
    document.getElementById("teamAn").value = "";
}


function getDates()
{
    if(getDataFromLocalStorage('massiveData') != null)
    {
        listArMn = getDataFromLocalStorage('massiveData');
    }
    console.log(listArMn);

    setInterval(updateGTimeDisplay, 10);
}


function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getDataFromLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return JSON.parse(storedData);
}


function clearIeprV()
{
    localStorage.clear();
    listArMn = [];
    Swal.fire({
        icon: 'info',
        title: 'Bija attirita atmiņa!',
        text: 'Bija nospiesta poga!',})
}

function updateGTimeDisplay()
{
    let currentdate = new Date(); 
    let datetime = + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    document.getElementById("timeRNow").innerHTML = "( curent time: " + datetime + " )";
}