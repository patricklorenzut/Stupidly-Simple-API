var underpolished_chat = function () {    

    var settings, base_url, outside_frame_css, inside_frame_css, chat_image, button_frame_wrapper, box_frame_wrapper, button_frame, box_frame, message_area, button_content, box_content, skittles, version
    
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }

    function hide_box(){
        button_content.getElementById('underpolishedchat-button').setAttribute('class','underpolishedchat-bg-color');
        box_frame_wrapper.style.display = 'none'
        button_content.getElementById('underpolishedchat-button').innerHTML = settings.button_text
    }
    function show_box(){
        button_content.getElementById('underpolishedchat-button').setAttribute('class','underpolishedchat-bg-color');
        button_content.getElementById('underpolishedchat-button').innerHTML = 'Close'
        box_frame_wrapper.style.display = 'block'
        message_area.focus()
    }
    function toggle_box(){
        if(isHidden(box_frame_wrapper)){
            show_box()
        }else{            
            hide_box()
        }

    }

    function swap_colors(color){
        var elements = button_content.getElementsByClassName('underpolishedchat-bg-color');
            for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].style.backgroundColor = color;
            }
        }
        var elements = box_content.getElementsByClassName('underpolishedchat-bg-color');
            for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].style.backgroundColor = color;
            }
        }
    }

    function setup_button_frame(){
        //frame wrapper
        button_frame_wrapper = document.createElement("div")
        button_frame_wrapper.setAttribute('id', 'underpolishedchat-button-frame-wrapper')
        button_frame_wrapper.classList.add('underpolishedchat-frame-wrapper')
        document.body.appendChild(button_frame_wrapper)
            
        //inner
        button_frame = document.createElement('iframe');
        button_frame.setAttribute('id','underpolishedchat-button-frame')
        button_frame.setAttribute('scrolling','no')
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="underpolishedchat-wrapper" style="display:none;"><div id="underpolishedchat-button" class="underpolishedchat-bg-color">' + settings.button_text + '</div></div></body>';
        button_frame_wrapper.appendChild(button_frame);
        button_frame.contentWindow.document.open();
        button_frame.contentWindow.document.write(html);
        button_frame.contentWindow.document.close(); 
    }

    function setup_box_frame(){
        //frame wrapper
        box_frame_wrapper = document.createElement("div")
        box_frame_wrapper.setAttribute('id', 'underpolishedchat-chat-frame-wrapper')
        box_frame_wrapper.classList.add('underpolishedchat-frame-wrapper')
        document.body.appendChild(box_frame_wrapper)
            
        //inner
        box_frame = document.createElement('iframe');
        box_frame.setAttribute('id','underpolishedchat-chat-frame')
        box_frame.setAttribute('scrolling','no')
        var html = '<head> <link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body> <div id="underpolishedchat-wrapper" style="display:none;"> <div id="underpolishedchat-full"> <div id="underpolishedchat-header" class="underpolishedchat-bg-color"> <strong>' + settings.title + '</strong> <div class="close"> <img src="' + base_url + '/img/close.png" alt="Close"/> </div></div><div id="underpolishedchat-chat"> <form action="' + base_url + '/contact" method="post"> <textarea required name="message" placeholder="' + settings.message_prompt + '" id="underpolishedchat-message"></textarea> </form> </div><div id="underpolishedchat-get-email"> <input type="email" id="underpolishedchat-email-input" placeholder="your@email.com" value="' + settings.visitor_email + '" required/> <p id="underpolishedchat-email-disclaimer">Your email address will be used ONLY to respond to this inquiry. You will not be added to any lists.</p><span id="email-submit-button" class="underpolishedchat-bg-color"> Submit Message </span><p id="underpolishedchat-branding"><a href="https://underpolished.com" target="_blank">Underpolished Chat</a></p> </div></div></div></body>';
        box_frame_wrapper.appendChild(box_frame);
        box_frame.contentWindow.document.open();
        box_frame.contentWindow.document.write(html);
        box_frame.contentWindow.document.close(); 
    }
  

    function add_listeners(){

        //when button is pressed
        button_content.getElementById("underpolishedchat-button").addEventListener("click", function(){
            toggle_box()
        });

        //when close icon is pressed
        box_content.getElementsByClassName('close')[0].addEventListener("click", function(){
            toggle_box()
        });      

        message_area = box_content.getElementById('underpolishedchat-message')
        
        box_content.getElementById("email-submit-button").addEventListener("click", function(){
            submit_email();
        }); 
    }    

    function validate_email(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function submit_email(){
        
        var visitor_email = box_content.getElementById('underpolishedchat-email-input').value;
        if(validate_email(visitor_email)){
            var message_contents = message_area.value

            //TODO uncomment this
            message_area.value = ''
            hide_box()
            
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", base_url + '/chat', true);
            xhttp.onreadystatechange = function() {                
                if (this.readyState == 4 && this.status == 200) {                
                    
                }
            };

            var data = new FormData();
            data.append('id', settings.id);
            data.append('token', settings.token);
            data.append('message', message_contents);
            data.append('email', visitor_email);
            data.append('name', skittles);
            data.append('url', window.location.href);
            xhttp.send(data);

            //TODO change icon to SENT instead
            button_content.getElementById('underpolishedchat-button').innerHTML = 'Your email has been sent successfully. Thanks!'
            button_content.getElementById('underpolishedchat-button').setAttribute('class','underpolishedchat-bg-color sent');          
            
        }else{
            alert('You’ve entered an invalid email address. A valid email address is required in order to get in contact with you. But don’t worry, you will NOT be added to any email lists, your data will not be sold, etc.')
        }
    }

    /******** starting point for your widget ********/
    function main() {
        //your widget code goes here                    
        skittles = "Jane Doe"
        setTimeout(function(){ skittles = 822 }, 6000);

        version = 2

        settings = window.UnderpolishedChatSettings;         
        base_url = 'https://api.underpolished.com'        

        if(settings.dev){
            base_url = 'http://localhost:8000'
        }
        
        settings.title = 'How Can I Help?'
        settings.message_prompt = 'Write me a message.'
        
        if(settings.we){
            settings.title = 'How Can We Help?'
            settings.message_prompt = 'Write us a message.'
        }

        if(!settings.visitor_email){
            settings.visitor_email = ''
        }

        if(!settings.button_text){
            settings.button_text = 'Email Me!'
            if(settings.we){
                settings.button_text = 'Email Us!'
            }
        }

        if(settings.token && settings.id){
            //build urls
            outside_frame_css = base_url + '/css/chatwidget-frames.css?v=' + version
            inside_frame_css = base_url + '/css/chatwidget.css?v=' + version
            chat_image = base_url + '/img/chat.png'

            //load frame css
            document.querySelector('head').innerHTML += '<link rel="stylesheet" href="' + outside_frame_css + '" type="text/css"/>'

            setup_button_frame()
            setup_box_frame()

            button_content = button_frame.contentDocument
            box_content = box_frame.contentDocument

            if(settings.whitelabel){
                box_content.getElementById('underpolishedchat-full').classList = 'whitelabeled'
            }

            add_listeners()
        }

        if(settings.color){
            swap_colors(settings.color);
        }
            

    }

    main()

    return {
        open: function(){
            show_box();
        },
        close: function (){
            hide_box();
        },
        toggle: function(){
            toggle_box();
        }
    };  

}();