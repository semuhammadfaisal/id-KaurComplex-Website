@echo off
echo Fixing video deployment issues...

echo Step 1: Remove Git LFS tracking
git lfs untrack "*.mp4"

echo Step 2: Remove .gitattributes LFS config
echo # No LFS tracking > .gitattributes

echo Step 3: Remove LFS cached files
git rm --cached assets/videos/**/*.mp4

echo Step 4: Add videos back as regular files
git add assets/videos/

echo Step 5: Commit changes
git commit -m "Remove Git LFS, add videos as regular files"

echo Done! Videos should now work on Vercel.
echo Note: If videos are still too large, consider compressing them.
pause