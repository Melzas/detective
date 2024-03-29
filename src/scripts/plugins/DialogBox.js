export default class DialogBox extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {
        super(scene, pluginManager);
    }

    boot() {
        var eventEmitter = this.systems.events;
        eventEmitter.on("destroy", this.destroy, this);
    }

    // Called when a Scene shuts down, it may then come back again later
    // (which will invoke the "start" event) but should be considered dormant.
    shutdown() {
        this.graphics.visible = false;
        this.closeBtn.visible = false;
        if (this.timedEvent) this.timedEvent.remove();
        if (this.owner) this.owner.destroy();
        if (this.text) this.text.destroy();
    }

    // called when a Scene is destroyed by the Scene Manager
    destroy() {
        this.shutdown();
        this.scene = undefined;
    }

    // Initialize the dialog modal
    init(opts) {
        // Check to see if any optional parameters were passed
        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || "darkgoldenrod";
        this.dialogSpeed = opts.dialogSpeed || 6;

        this.eventCounter = 0;
        this.visible = true;
        this.owner;
        this.text;
        this.dialog;
        this.graphics;
        this.closeBtn;

        // Create the dialog window
        this._createWindow();
    }

    // Hide/Show the dialog window
    toggleWindow() {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
    }

    // Slowly displays the text in the window to make it appear annimated
    _animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.timedEvent.remove();
        }
    }

    // Calcuate the position of the text in the dialog window
    setOwner(owner) {
        // Reset the dialog
        if (this.owner) this.owner.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

        this.owner = this.scene.make.text({
            x,
            y,
            text: owner,
            style: {
                color: '#FFCF00',
                font: "25px Times New Roman",
                wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
            }
        });
        this.owner.setScrollFactor(0);
        this.owner.depth = 10;
    }

    // Sets the text for the dialog window
    setText(text, animate) {
        if (this.owner) text = "\n" + text;
        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;

        this._setText(tempText);

        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true
            });
        }
    }

    // Calcuate the position of the text in the dialog window
    _setText(text) {
        // Reset the dialog
        if (this.text) this.text.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                font: "25px Times New Roman",
                wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
            }
        });
        this.text.setScrollFactor(0);
        this.text.depth = 10;
    }

    // Creates the dialog window
    _createWindow() {
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics().setScrollFactor(0);
        this.graphics.depth = 10;

        this._createOuterWindow(windowDimensions);
        this._createInnerWindow(windowDimensions);
        this._createCloseModalButtonBorder();
        this._createCloseModalButton();
    }

    // Gets the width of the game (based on the scene)
    _getGameWidth() {
        return this.systems.game.config.width;
    }

    // Gets the height of the game (based on the scene)
    _getGameHeight() {
        return this.systems.game.config.height;
    }

    // Calculates where to place the dialog window based on the game size
    _calculateWindowDimensions(width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }

    // Creates the inner dialog window (where the text is displayed)
    _createInnerWindow({ x, y, rectWidth, rectHeight }) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    // Creates the border rectangle of the dialog window
    _createOuterWindow({ x, y, rectWidth, rectHeight }) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    // Creates the close dialog button border
    _createCloseModalButtonBorder() {
        var x = this._getGameWidth() - this.padding - 20;
        var y = this._getGameHeight() - this.windowHeight - this.padding;
        this.graphics.strokeRect(x, y, 20, 20);
    }

    // Creates the close dialog window button
    _createCloseModalButton() {
        var self = this;
        this.closeBtn = this.scene.make.text({
            x: this._getGameWidth() - this.padding - 14,
            y: this._getGameHeight() - this.windowHeight - this.padding + 3,
            text: "X",
            style: {
                font: "bold 12px Arial",
                fill: this.closeBtnColor
            }
        });
        this.closeBtn.setInteractive().setScrollFactor(0);
        this.closeBtn.depth = 10;

        this.closeBtn.on("pointerover", function () {
            this.setTint(0xff0000);
        });
        this.closeBtn.on("pointerout", function () {
            this.clearTint();
        });
        this.closeBtn.on("pointerdown", function () {
            self.toggleWindow();
            if (self.timedEvent) self.timedEvent.remove();
            if (self.owner) self.owner.destroy();
            if (self.text) self.text.destroy();
        });
    }
}