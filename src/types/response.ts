export interface FaceRectangle {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

export interface Position {
    x?: number;
    y?: number;
}

export interface FaceLandmarks {
    pupilLeft?: Position;
    pupilRight?: Position;
    noseTip?: Position;
    mouthLeft?: Position;
    mouthRight?: Position;
    eyebrowLeftOuter?: Position;
    eyebrowLeftInner?: Position;
    eyeLeftOuter?: Position;
    eyeLeftTop?: Position;
    eyeLeftBottom?: Position;
    eyeLeftInner?: Position;
    eyebrowRightInner?: Position;
    eyebrowRightOuter?: Position;
    eyeRightInner?: Position;
    eyeRightTop?: Position;
    eyeRightBottom?: Position;
    eyeRightOuter?: Position;
    noseRootLeft?: Position;
    noseRootRight?: Position;
    noseLeftAlarTop?: Position;
    noseRightAlarTop?: Position;
    noseLeftAlarOutTip?: Position;
    noseRightAlarOutTip?: Position;
    upperLipTop?: Position;
    upperLipBottom?: Position;
    underLipTop?: Position;
    underLipBottom?: Position;
}

export interface FacialHair {
    mustache?: number;
    beard?: number;
    sideburns?: number;
}

export interface HeadPose {
    roll?: number;
    yaw?: number;
    pitch?: number;
}

export interface FaceAttributes {
    age?: number;
    gender?: string;
    smile?: number;
    facialHair?: FacialHair;
    glasses?: string;
    headPose?: HeadPose;
    emotion?: Emotion;
}

export interface Emotion {
    Anger?: number;
    Contempt?: number;
    Disgust?: number;
    Fear?: number;
    Happiness?: number;
    Neutral?: number;
    Sadness?: number;
    Surprise?: number;
}

export interface FaceApiResponse {
    faceId?: string;
    faceRectangle?: FaceRectangle;
    faceLandmarks?: FaceLandmarks;
    faceAttributes?: FaceAttributes;
}

