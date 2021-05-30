import { create, all } from 'mathjs';

const config = { };
const math = create(all, config);

import { isPowerOfTwo } from './utils';

const BayerMatrix = (dim: number) => {
    //Get the Bayer matrix with side of length n (n must be a power of 2)
    // Reference: https://en.wikipedia.org/wiki/Ordered_dithering
    return math.multiply(math.add(BayerSubMatrix(dim), 1), 255/(1 + dim*dim));
}

const BayerSubMatrix = (dim: number): math.MathArray | math.Matrix => {

    if (!isPowerOfTwo(dim)) {
        console.log("error dim");
        return undefined;
    }

    // TODO: fix recursion
    if( dim >= 8 ) {
        return math.matrix(
        [[0,32,8,40,2,34,10,42],
        [48,16,56,24,50,18,58,26],
        [12,44,4,36,14,46,6,38],
        [60,28,52,20,62,30,54,22],
        [3,35,11,43,1,33,9,41],
        [51,19,59,27,49,17,57,25],
        [15,47,7,39,13,45,5,37],
        [63,31,55,23,61,29,53,21]]);
    }

    if (dim <= 2) {
        return math.matrix([[0, 2], [3, 1]]);
    } else {
        const subDim = dim >> 1;
        
        const recurse4 = math.multiply(BayerSubMatrix(subDim), 4);

        const mat = math.zeros(dim, dim);
        
        // [4 * recurse,     4 * recurse + 2],
        // [4 * recurse + 3, 4 * recurse + 1]]
        mat.subset(math.index([0, subDim-1], [0, subDim-1]), recurse4);
        mat.subset(math.index([subDim, dim-1], [0, subDim-1]), math.add(recurse4, 2));
        mat.subset(math.index([0, subDim-1], [subDim, dim-1]), math.add(recurse4, 3));
        mat.subset(math.index([subDim, dim-1], [subDim, dim-1]), math.add(recurse4, 1));
        
        return mat;
    }
};


const FloydDithering = (width: number, height: number, imageData: Uint8ClampedArray) => {
    // greyscale (sets r pixels to luminance of rgb)
    for (var i = 0; i <= imageData.length; i += 4)
        imageData[i] = Math.floor(0.2126*imageData[i] + 0.7152*imageData[i+1] + 0.0722*imageData[i+2]);
    
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const id = (y * width + x) * 4;

            const value = imageData[id] < 128 ? 0 : 255;
            const errorOver16 = Math.floor((imageData[id] - value) / 16);
            imageData[id] = value;
    
            imageData[(y * width + (x+1)) * 4] +=  7 * errorOver16;
            imageData[((y+1) * width + (x-1)) * 4] +=  3 * errorOver16;
            imageData[((y+1) * width + x) * 4] +=  5 * errorOver16;
            imageData[((y+1) * width + (x+1)) * 4] +=  1 * errorOver16;
        }
    }
    
    for (var i = 0; i <= imageData.length; i += 4) imageData[i + 1] = imageData[i + 2] = imageData[i];
}

const BayerDithering = (width: number, height: number, imageData: Uint8ClampedArray, bayerSize: number = 4) => {
    // greyscale (sets r pixels to luminance of rgb)
    for (var i = 0; i <= imageData.length; i += 4)
        imageData[i] = Math.floor(0.2126*imageData[i] + 0.7152*imageData[i+1] + 0.0722*imageData[i+2]);
    
    const bayerThresholdMap = BayerMatrix(bayerSize).valueOf();

    console.log(bayerThresholdMap);
    
    
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const id = (y * width + x) * 4;            
            imageData[id] = (imageData[id] > bayerThresholdMap[x%bayerSize][y%bayerSize]) ? 255 : 0;
        }
    }

    // Set g and b pixels equal to r
    for (var i = 0; i <= imageData.length; i += 4) {
        imageData[i + 1] = imageData[i + 2] = imageData[i];
    }
}


const Threshold = (width: number, height: number, imageData: Uint8ClampedArray, threshold: number = 128) => {
    // greyscale (sets r pixels to luminance of rgb)
    for (var i = 0; i <= imageData.length; i += 4)
        imageData[i] = Math.floor(0.2126*imageData[i] + 0.7152*imageData[i+1] + 0.0722*imageData[i+2]);

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const id = (y * width + x) * 4;     
            imageData[id] = (imageData[id] > threshold) ? 255 : 0;
        }
    }

    for (var i = 0; i <= imageData.length; i += 4) imageData[i + 1] = imageData[i + 2] = imageData[i];
}

export {
    BayerMatrix, 
    BayerSubMatrix,
    BayerDithering,
    Threshold,
    FloydDithering
}

