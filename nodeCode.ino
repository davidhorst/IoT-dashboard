#include <ESP8266WiFi.h>

const char* ssid = "ssid";
const char* password = "password";
  
String ledStatus = "false";
int val = 0;

// Create an instance of the server
// specify the port to listen on as an argument
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  delay(10);

  // prepare GPIO2
  pinMode(2, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT); 
  digitalWrite(2, 0);

  // Turn LED off
  digitalWrite(LED_BUILTIN, HIGH);
  
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
  
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
  
  // Read the first line of the request
  String req = client.readStringUntil('\r');
  Serial.println(req);
  client.flush();
  
  // Match the request
  int toggle = 0;
  
  if (req.indexOf("/status") != -1)
    Serial.println("Status Request rcvd");
  else if (req.indexOf("/toggle") != -1)
    Serial.println("Toggle Command rcvd"),
    toggle = 1;
  else {
    Serial.println("invalid request");
    client.stop();
    return;
  }

  Serial.println(toggle);
  Serial.println(val);
  if (toggle == 1){
    toggle = 0;
    if (val)
      val = 0,
      ledStatus = "false";
    else {
      val = 1,
      ledStatus = "true";
    };
  };
 
  
//  if (req.indexOf("/gpio/0") != -1)
//    val = 0,
//    ledStatus = "off";
//  else if (req.indexOf("/gpio/1") != -1)
//    val = 1,
//    ledStatus = "on";
//  else {
//    Serial.println("invalid request");
//    client.stop();
//    return;
//  }

  // Set GPIO2 according to the request
  digitalWrite(2, val);
  if (val == 0 ) {
    digitalWrite(LED_BUILTIN, HIGH);
  } else if ( val == 1) {
    digitalWrite(LED_BUILTIN, LOW);
  }
  
  client.flush();

  // Prepare the response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println("Access-Control-Allow-Origin: *");
    client.println();
    client.print("{\"status\":\"");
    client.print(ledStatus);
    client.print("\"}");
    client.println();

  // Send the response to the client
//  client.print(s);
  delay(1);
  Serial.println("Client disonnected");

  // The client will actually be disconnected 
  // when the function returns and 'client' object is detroyed
}
