window.Swipe = function (a, b) {
    if (!a) return null;
    var c = this;
    this.options = b || {};
    this.index = this.options.startSlide || 0;
    this.speed = this.options.speed || 300;
    this.callback = this.options.callback ||
    function () {};
    this.delay = this.options.auto || 0;
    this.container = $(a);
    this.element = this.container.get(0).children[0];
    this.setup();
    this.begin();
    if (this.element.addEventListener) {
        this.element.addEventListener("touchstart", this, false);
        this.element.addEventListener("touchmove", this, false);
        this.element.addEventListener("touchend", this, false);
        this.element.addEventListener("webkitTransitionEnd", this, false);
        this.element.addEventListener("msTransitionEnd", this, false);
        this.element.addEventListener("oTransitionEnd", this, false);
        this.element.addEventListener("transitionend", this, false);
        window.addEventListener("resize", this, false)
    }
};
Swipe.prototype = {
    setup: function () {
        this.slides = this.element.children;
        this.length = this.slides.length;
        if (this.length < 2) return null;
        this.width = this.container.get(0).getBoundingClientRect().width;
		//this.width = $(this.container).width();
		//console.log($(this.container).width());
        if (!this.width) return null;
        this.container.css("visibility", "hidden");
        this.element.style.width = this.slides.length * this.width + "px";
        var a = this.slides.length;
        while (a--) {
            var b = $(this.slides[a]);
            b.css({
                width: this.width + "px"
            });
            if (!b.data("height")) {
                b.data("height", b.height(true))
            }
        }
        this.container.addClass("swipe-initialized");
        this.slide(this.index, 0);
        this.container.css("visibility", "")
    },
    slide: function (a, b) {
        var c = this.element.style;
        if (b == undefined) {
            b = this.speed
        }
        c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms";
        c.MozTransform = c.webkitTransform = "translate3d(" + -(a * this.width) + "px,0,0)";
        c.msTransform = c.OTransform = "translateX(" + -(a * this.width) + "px)";
        this.index = a;
        this.container.height($(this.slides[a]).data("height"))
    },
    getPos: function () {
        return this.index
    },
    prev: function (a) {
        this.delay = a || 0;
        clearTimeout(this.interval);
        if (this.index) this.slide(this.index - 1, this.speed)
    },
    next: function (a) {
        this.delay = a || 0;
        clearTimeout(this.interval);
        if (this.index < this.length - 1) this.slide(this.index + 1, this.speed);
        else this.slide(0, this.speed)
    },
    begin: function () {
        var a = this;
        this.interval = this.delay ? setTimeout(function () {
            a.next(a.delay)
        }, this.delay) : 0
    },
    stop: function () {
        this.delay = 0;
        clearTimeout(this.interval)
    },
    resume: function () {
        this.delay = this.options.auto || 0;
        this.begin()
    },
    handleEvent: function (a) {
        switch (a.type) {
        case "touchstart":
            this.onTouchStart(a);
            break;
        case "touchmove":
            this.onTouchMove(a);
            break;
        case "touchend":
            this.onTouchEnd(a);
            break;
        case "webkitTransitionEnd":
        case "msTransitionEnd":
        case "oTransitionEnd":
        case "transitionend":
            this.transitionEnd(a);
            break;
        case "resize":
            this.setup();
            break
        }
    },
    transitionEnd: function (a) {
        if (this.delay) this.begin();
        this.callback(a, this.index, this.slides[this.index])
    },
    onTouchStart: function (a) {
        this.start = {
            pageX: a.touches[0].pageX,
            pageY: a.touches[0].pageY,
            time: Number(new Date)
        };
        this.isScrolling = undefined;
        this.deltaX = 0;
        this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0
    },
    onTouchMove: function (a) {
        if (a.touches.length > 1 || a.scale && a.scale !== 1) return;
        this.deltaX = a.touches[0].pageX - this.start.pageX;
        if (typeof this.isScrolling == "undefined") {
            this.isScrolling = !! (this.isScrolling || Math.abs(this.deltaX) < Math.abs(a.touches[0].pageY - this.start.pageY))
        }
        if (!this.isScrolling) {
            a.preventDefault();
            clearTimeout(this.interval);
            this.deltaX = this.deltaX / (!this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
            this.element.style.MozTransform = this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)"
        }
    },
    onTouchEnd: function (a) {
        var b = Number(new Date) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
            c = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
        if (!this.isScrolling) {
            this.slide(this.index + (b && !c ? this.deltaX < 0 ? 1 : -1 : 0), this.speed)
        }
    },
    getActiveIndex: function () {
        return this.index
    }
}