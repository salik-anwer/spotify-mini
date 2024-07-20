const getGradient = (accentColor: string) => {

    const adjustColor = (color: string, percent: number) => {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1).toUpperCase();
      };
    
      const lighterAccentColor = adjustColor(accentColor, 10); 
      const darkerAccentColor = adjustColor(accentColor, -20);
    
      const gradientBackground = `linear-gradient(to right, ${lighterAccentColor}, ${accentColor}, ${darkerAccentColor})`;

      return gradientBackground;
}

export {getGradient};

