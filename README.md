# Etalase Hasil Karya Siswa

Sebuah aplikasi e-talase hasil karya inovatif siswa SMK berbasis mobile, dikembangkan dengan React Native.

<p align="center">
  <img src="https://img.shields.io/npm/dw/react-native-image-picker" />
  <img src="https://img.shields.io/npm/v/react-native-image-picker" />
</p>

### Make sure you're reading the doc applicable to your version, for example if your using version 3.8.0 go to tag 3.8.0 and read those docs. This doc is always that of main branch.

### Also read version release notes for any breaking changes especially if you're updating the major version.

# Install

```
yarn add react-native-image-picker
# RN >= 0.60
cd ios && pod install
# RN < 0.60
react-native link react-native-image-picker
```

## Post-install Steps

### iOS

Add the appropriate keys to your Info.plist,

If you are allowing user to select image/video from photos, add `NSPhotoLibraryUsageDescription`.

If you are allowing user to capture image add `NSCameraUsageDescription` key also.

If you are allowing user to capture video add `NSCameraUsageDescription` add `NSMicrophoneUsageDescription` key also.

### Android

No permissions required (`saveToPhotos` requires permission [check](#note-on-file-storage)).

Note: This library does not require Manifest.permission.CAMERA, if your app declares as using this permission in manifest then you have to obtain the permission before using `launchCamera`.
