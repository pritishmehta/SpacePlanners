import subprocess
try:
    result = subprocess.run(['git', 'show', 'HEAD:index.html'], capture_output=True, check=True)
    with open('old_index.html', 'wb') as f:
        f.write(result.stdout)
    print("Saved old_index.html")
except Exception as e:
    print("Error:", e)
