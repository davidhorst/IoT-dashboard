# Little IoT controller

I started playing with wifi enabled hobby boards and needed an interface to switch them on and off, read data, etc.  I integrated sockets so multiple users can activate the swtiches and have a consistent real time view of the switch state.

### Installing

There isn't much to this- but it has a few node and bower packages so go ahead and:

```
npm install
bower install
```
then let it rip

``` 
node server
```

## Built With

Client

* [angular](https://angularjs.org/) - because two way data is fun
* [angular-material](https://material.angularjs.org/latest/) - angular-material automatically renders changes when underlying data changes, which is pretty handy when dealing with a bunch of switches
* [socket.io](http://socket.io/) - allows view to be kept accurate in real time when multiple users are activating the same nodes. 

Server
* [express](http://expressjs.com/) - simple and small! 
* [socket.io](http://socket.io/)

## Authors

* **David Horst** 

## License

This project is licensed under the MIT License
