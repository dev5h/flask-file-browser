from app import  app, render_template

@app.route("/")
def view_home_root():
    return render_template("index.html", path="/")

@app.route("/<path:cdir>")
def view_home_cdir(cdir):
    return render_template("index.html",path=f'/{cdir}')