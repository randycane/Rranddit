from app.models import Subranddit, db
from ..models import Post, db

def undo_posts():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_posts():
    postsArray= [{
        "post_title": "Who is the bigger villain?",
        "post_text": "Hanma or Kisaki?",
        "img_url": "https://i.pinimg.com/736x/f5/58/6c/f5586c32f58cdadc4b2d852337e95c44.jpg",
        "user_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Who is the best fighter?",
        "post_text": "Mikey or Draken?",
        "img_url": "https://i1.sndcdn.com/artworks-6Pz3gHOqky5HQajF-5FmqhA-t500x500.jpg",
        "user_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Chapter 299 Discussion Post",
        "post_text": "Discuss thoughts here",
        "img_url": "https://images.mid-day.com/images/images/2016/feb/06-Manji-symbol.jpg",
        "user_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Appreciation Post",
        "post_text": "Can we all agree that Emma is best girl?",
        "img_url": "https://thicc.mywaifulist.moe/waifus/38197/40b924e41091678f0ad8eb359a588b8d328529250b08f774f8df529bfb12e3d2_thumb.jpg",
        "user_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Hot Take Alert",
        "post_text": "Akkun is a better fighter than Pah",
        "img_url": "https://i.pinimg.com/736x/60/08/de/6008debff894a6e04026449a5a99a580.jpg",
        "user_id": 3,
        "subranddit_id": 1
    },
    {
        "post_title": "Sumi is so beautiful",
        "post_text": "Can anyone tell me why she is not more popular?",
        "img_url": "https://i.pinimg.com/736x/ce/13/52/ce1352208b655ea727f6481c391db7ce.jpg",
        "user_id": 3,
        "subranddit_id": 6
    },
    {
        "post_title": "A Complaint",
        "post_text": "Why is there so much fan service.",
        "img_url": "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/07/rent-a-girlfriend-season-2-episode-1-kazuya-kinoshita-ichinose-chizuru-memories-1.jpg",
        "user_id": 3,
        "subranddit_id": 6
    },
    {
        "post_title": "Thank you fellow brethren",
        "post_text": "You make me feel like larger than just myself <3",
        "img_url": "https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/05/rentagirlfriendseason2_chizurudatevisual-1-e1652532640145.jpg",
        "user_id": 3,
        "subranddit_id": 6
    },]
    for postrandy in postsArray:
        newrandy = Post(
            post_title = postrandy["post_title"],
            post_text = postrandy['post_text'],
            img_url = postrandy['img_url'],
            user_id= postrandy['user_id'],
            subranddit_id = postrandy['subranddit_id']
        )
        db.session.add(newrandy)
    db.session.commit()
    print("Successfully seeded posts")
