# A django project for my personal uses

This is a simple one page website to upload a file[s] to my server (usually my PC). I use it when I can't send a file through other means (like data cable, which is sometimes a little slow). Just connect the other device (sender) to the same network, start server, and upload the file. The file will go to (project)/main/media/main/{filename}. It uses AJAX to upload and has a progressbar with cancel support. It also shows all the files uploaded previously (ordered by latest), which can be viewed/downloaded by anyone in the same network.
