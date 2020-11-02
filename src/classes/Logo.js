class Logo {
    static logoPath = "/logo.png";
    static logoDarken = {filter:"brightness(90%)"};
    static logoBg = (position,blendMode,transparent) => ({
        backgroundImage:        "url('"+this.logoPath+"')",
        backgroundSize:         "contain",
        backgroundPosition:     position,
        backgroundRepeat:       "no-repeat",
        backgroundBlendMode:    blendMode?blendMode:"color-dodge",
        filter:                 (transparent?"opacity(0.3)":""),
    });
}

export default Logo;