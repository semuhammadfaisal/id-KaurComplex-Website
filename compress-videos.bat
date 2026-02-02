@echo off
echo Compressing videos to reduce file size...
echo This requires FFmpeg to be installed
echo.

for %%f in ("assets\videos\tower-c\*.mp4") do (
    echo Compressing %%f...
    ffmpeg -i "%%f" -vcodec h264 -crf 28 -preset medium "%%~nf_compressed.mp4"
)

echo.
echo Compression complete! Replace original files with compressed versions.
pause