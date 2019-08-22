export let ajax = (url, data, cb) => {
  let client = new XMLHttpRequest();
  client.responseType = "json";
  client.onreadystatechange = () => {
    if(client.status == 200 && client.readyState == 4) cb && cb(client);
  }
  data ? client.open("POST", url, true) : client.open("GET", url, true);
  client.send(data);
};