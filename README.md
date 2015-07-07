<img src="http://gitt.io/badge.svg"/>

# jumper.layout.titanium.Alloy
Slidding layout widget of titanium widget

# Dependencies 

1. A Twitter Bootstrap inspired framework for Appcelerator Titanium (Alloy)
1. https://github.com/TNuzzi/wriststrap

#uses:

		<Widget src="jumperLayout" backgroundColor="#0095DA">
			    <View id="slide1" title="Dashboard" tabWidth="70" width="100%" >
	          <Label>Text 1</Label> 
	        </View>

	        <View id="slide2" title="My Account" tabWidth="70" width="100%" left="100%" backgroundColor="red" >
	          	<Label>Text 2</Label> 
	        </View>

	        <View id="slide3" title="How it works"  tabWidth="80" width="100%" left="100%" backgroundColor="green" >
	        	<Label>Text 3</Label> 
	        </View>

	        <View id="slide4" title="Post Job" tabWidth="70" width="100%" left="100%" backgroundColor="white" >
	        	<Label>Text 4</Label> 
	        </View>
		</Widget>
		
	#Required attributes here:
  <View id="slide1" title="Dashboard" tabWidth="70" width="100%" >
    <Label>Text 1</Label> 
  </View>
  
  1. width    : REQUIRED : it will be define the tab contents width.
  2. title    : REQUIRED : it will be define the tab title.
  2. tabWidth : REQUIRED : it will be define width of the tab.
  
  #Preview
  <img width="300" src="http://nirajmaharjan.com.np/freefiles/tab1.png"/>
  <img width="300" src="http://nirajmaharjan.com.np/freefiles/tab2.png"/>
  <img width="300" src="http://nirajmaharjan.com.np/freefiles/tab3.png"/>
  
  #Demo
  http://nirajmaharjan.com.np/freefiles/jumperLayoutTitaniumAlloyWidget.swf
  OR
  <br>
  http://screencast.com/t/pclyNc9bi0
