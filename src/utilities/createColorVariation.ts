export const createColorVariation = (hex: string, percent: number) => {
    hex = hex.replace('#', '');
  
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    r = Math.round(r * (1 + percent));
    g = Math.round(g * (1 + percent));
    b = Math.round(b * (1 + percent));
    
    r = Math.min(r, 255);
    g = Math.min(g, 255);
    b = Math.min(b, 255);
    
    const result = `#${(r).toString(16).padStart(2, '0')}${(g).toString(16).padStart(2, '0')}${(b).toString(16).padStart(2, '0')}`;
    return result;
};