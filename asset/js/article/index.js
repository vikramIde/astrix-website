
(function () {
    /** This is a plugin for 
     *  Authenticating with Blog
     *  for different Client Apps
     *  Dependency : [Axios,window.cookie]
     *  All the functions will response into promise
     */
    this.ToolkitAuth = function () {
        if (typeof axios != "undefined") {
            this.API_URL = 'http://127.0.0.1:8000/api/'
            this.rootDomain = "http://127.0.0.1:8000/"
            this.TNC = false
            this.service = axios.create({
                baseURL: this.API_URL,
                timeout: 30000
            });
        }
        else {
            alert('Install Axios either by calling as CDN or in your project')
            console.error('Install Axios either by calling as CDN or in your project')
            return false
        }

    }

    /**
     * getArticle method
     * then setGlobalCookie against .zellar.co.uk
     * @param {} data - Empty object
     */
    ToolkitAuth.prototype.getArticle = function (data) {

           return  this.service({
                url: this.API_URL + 'articles',
                method: 'get',
                data
            })
    }

    ToolkitAuth.prototype.getBlog = function (id) {

           return  this.service({
                url: this.API_URL + 'articles/'+id,
                method: 'get',
                data:{}
            })
    }

    ToolkitAuth.prototype.comment = function (data) {

           return  this.service({
               url: this.API_URL + 'articles/' + data.article_id+'/comment',
                method: 'post',
                data
            })
    }
    ToolkitAuth.prototype.addCookie = function (rs) {
        this.setCookies('name', rs.name);
        this.setCookies('email', rs.email);
        this.setCookies('id', rs.id);
        this.setCookies('lead_id', rs.new_data_storage_id);
        this.setCookies('role', rs.role);
        this.setCookies('team_id', rs.team_id);
        this.setCookies('team_name', rs.team_name);
        this.setCookies('token', rs.token);
    }

    ToolkitAuth.prototype.checkToken = function() {
        return new Promise((resolve, reject)=>{
            let token = getCookie('token')
            if(token)
            {
                if(token.length>0)
                    resolve(token)
                else
                    reject(true)
            }
            else
                reject(true)
        });
    }

    ToolkitAuth.prototype.login = function(__email,__password) {
        const data = {
            'email': __email,
            'password':__password
        }
        return this.service({
            url: bast_url + 'auth/login',
            method: 'post',
            data
        })
    }

    ToolkitAuth.prototype.setCookies = function (__key, __value) {
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = __key + "=" + __value + ";expires=" + myDate
            + ";domain=" + this.rootDomain + ";path=/";
        return document.cookie
    }

    function inputEmail(e) {
        const input = e;
        // Check if the input is NOT blank first, and if it's not, make sure it matches our regex test
        // Why: because we don't want to start validating before the user has started typing; after that it's fair game
        if (input && /(^\w.*@\w+\.\w)/.test(input)) {
            return true
        } else {
            return false
        }
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function loginByUsername(username, password) {
        const data = {
            'email': username,
            password
        }
        return this.service({
            url: bast_url + '/api/auth/login',
            method: 'post',
            data
        })
    }

    function logout() {
        return request({
            url: '/login/logout',
            method: 'post'
        })
    }

    function getUserInfo(token) {
        return request({
            url: bast_url + '/api/me',
            method: 'post'
        })
    }

}());



try {
    var Toolkit = new ToolkitAuth();
}
catch (err) {
    console.log(err)
}