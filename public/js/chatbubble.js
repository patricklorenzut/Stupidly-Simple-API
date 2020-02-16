var ssa_chatbubble = function () {    

    var settings, base_url, outside_frame_css, inside_frame_css, chat_image, button_frame_wrapper, box_frame_wrapper, button_frame, box_frame, message_area
    
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    }

    function hide_box(){
        button_frame.contentDocument.getElementById('ssa-chat-bubble-button').setAttribute('class','');
        box_frame_wrapper.style.display = 'none'
    }
    function show_box(){
        button_frame.contentDocument.getElementById('ssa-chat-bubble-button').setAttribute('class','open');
        box_frame_wrapper.style.display = 'block'
    }
    function toggle_box(){
        if(isHidden(box_frame_wrapper)){
            show_box()
        }else{            
            hide_box()
        }

    }

    function swap_colors(){
        // box_frame.find('#chatthingy-get-email p').css('background-color',settings.color);            
        // box_frame.find('#chatthingy-chat #by span').css('color',settings.color);
        // button_frame.find('#chatthingy-button').css('background-color',settings.color);               box_frame.find('#chatthingy-header').css('background-color',settings.color);
    }

    function setup_button_frame(){
        //frame wrapper
        button_frame_wrapper = document.createElement("div")
        button_frame_wrapper.setAttribute('id', 'ssa-chat-bubble-button-frame-wrapper')
        button_frame_wrapper.classList.add('ssa-chat-bubble-frame-wrapper')
        document.body.appendChild(button_frame_wrapper)
            
        //inner
        button_frame = document.createElement('iframe');
        button_frame.setAttribute('id','ssa-chat-bubble-button-frame')
        button_frame.setAttribute('scrolling','no')
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="ssa-chat-bubble-wrapper" style="display:none;"><div id="ssa-chat-bubble-button"><img src="' + chat_image + '"/><div class="close"></div></div></div></body>';
        button_frame_wrapper.appendChild(button_frame);
        button_frame.contentWindow.document.open();
        button_frame.contentWindow.document.write(html);
        button_frame.contentWindow.document.close(); 
    }

    function setup_box_frame(){
        //frame wrapper
        box_frame_wrapper = document.createElement("div")
        box_frame_wrapper.setAttribute('id', 'ssa-chat-bubble-chat-frame-wrapper')
        box_frame_wrapper.classList.add('ssa-chat-bubble-frame-wrapper')
        document.body.appendChild(box_frame_wrapper)
            
        //inner
        box_frame = document.createElement('iframe');
        box_frame.setAttribute('id','ssa-chat-bubble-chat-frame')
        box_frame.setAttribute('scrolling','no')
        var html = '<head><link rel="stylesheet" href="' + inside_frame_css + '" type="text/css"/><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="ssa-chat-bubble-wrapper" style="display:none;"> <div id="ssa-chat-bubble-full"> <div id="ssa-chat-bubble-header"> <strong>' + settings.title + '</strong> <div class="close"> <img src="' + base_url + '/img/close.png" alt=""/> </div></div><div id="ssa-chat-bubble-messages"><div><div class="default">' + settings.welcome_message + '</div></div></div><div id="ssa-chat-bubble-mask"></div><div id="ssa-chat-bubble-chat" class="ssa-chat-bubble-has-input"> <form action="' + base_url + '/contact" method="post"> <label>Message</label><textarea required name="message" placeholder="' + settings.message_prompt + '" id="ssa-chat-bubble-message"></textarea> <a id="by" href="https://stupidlysimple.app/?utm_source=chat_bubble_widget" target="_blank">powered by <span>stupidly simple</span></a> <img src="' + base_url + '/img/send.png" alt=""/> </span> </form> </div><div id="ssa-chat-bubble-get-email" class="ssa-chat-bubble-has-input"><label>Email Address (only used to reply)</label><input type="email" id="ssa-chat-bubble-email-input" placeholder="your@email.com" value="' + settings.visitor_email + '" required/> <span class="submit-button" id="email-submit-button"> Submit Message </span> </div></div></div></body>';
        box_frame_wrapper.appendChild(box_frame);
        box_frame.contentWindow.document.open();
        box_frame.contentWindow.document.write(html);
        box_frame.contentWindow.document.close(); 
    }
 

    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on'+event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }    

    function add_listeners(){

        //when button is pressed
        button_frame.contentDocument.getElementById("ssa-chat-bubble-button").addEventListener("click", function(){
            toggle_box()
        });

        //when close icon is pressed
        box_frame.contentDocument.getElementsByClassName('close')[0].addEventListener("click", function(){
            toggle_box()
        });

        message_area = box_frame.contentDocument.getElementById('ssa-chat-bubble-message')
        
        
        function isTyping () {
            box_frame.contentDocument.getElementById("ssa-chat-bubble-wrapper").classList = 'is-typing'
        }

        observe(message_area, 'change',  isTyping);
        observe(message_area, 'cut',     isTyping);
        observe(message_area, 'paste',   isTyping);
        observe(message_area, 'drop',    isTyping);
        observe(message_area, 'keydown', isTyping);
        
        box_frame.contentDocument.getElementById("email-submit-button").addEventListener("click", function(){
            submit_email();
        }); 
    }    

    function validate_email(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function submit_email(){
        
        var visitor_email = box_frame.contentDocument.getElementById('ssa-chat-bubble-email-input').value;
        if(validate_email(visitor_email)){
            var message_contents = message_area.value

            message_area.value = ''
            box_frame.contentDocument.getElementById("ssa-chat-bubble-wrapper").classList = ''
            hide_box()        
            
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", base_url + '/chat', true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {                
                }
            };

            var data = new FormData();
            data.append('app_id', settings.app_id);
            data.append('token', settings.token);
            data.append('message', message_contents);
            data.append('email', visitor_email);
            data.append('url', window.location.href);
            xhttp.send(data);

            alert('Your email has been sent successfully! And you’ve been CCed for your records.')
        }else{
            alert('You’ve entered an invalid email address. A valid email address is required in order to get in contact with you. But don’t worry, you will NOT be added to any email lists, your data will not be sold, etc.')
        }
    }

    /******** starting point for your widget ********/
    function main() {
        //your widget code goes here                    

        settings = window.SSAChatBubbleSettings;         
        base_url = 'https://api.stupidlysimple.app'        

        if(settings.dev){
            base_url = 'http://localhost:8000'
        }
        
        settings.title = 'How Can I Help?'
        settings.welcome_message = 'Hey there! Is there anything I can help you with? Send me a message and I’ll get back to you ASAP.'
        settings.message_prompt = 'Drop me a line.'
        
        if(settings.we){
            settings.title = 'How Can We Help?'
            settings.welcome_message = 'Hey there! Is there anything we can help you with? Send us a message and we’ll get back to you ASAP.'
            settings.message_prompt = 'Drop us a line.'
        }

        if(!settings.visitor_email){
            settings.visitor_email = ''
        }

        if(settings.token && settings.app_id){
            //build urls
            outside_frame_css = base_url + '/css/chatbubble-frames.css'
            inside_frame_css = base_url + '/css/chatbubble.css'
            chat_image = base_url + '/img/chat.png'

            //load frame css
            document.querySelector('head').innerHTML += '<link rel="stylesheet" href="' + outside_frame_css + '" type="text/css"/>'

            setup_button_frame()
            setup_box_frame()
            add_listeners()
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