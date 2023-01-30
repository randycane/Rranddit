from app.models import db, Subranddit

def seed_subranddits():
    subRandArray= [{
        "title": "Tokyo Revengers",
        "description": "Welcome to the subranddit for fans of Wakui's anime/manga. Diehard weebs found here",
        "icon_url": "https://static.dw.com/image/54725424_605.jpg",
        "banner_img": "https://www.tvseasonspoilers.com/wp-content/uploads/2021/11/Tokyo-Revengers-Season-2.jpeg",
        "owner_id": 2
    },
    {
        "title": "A Letter from Baji Keisuke",
        "description": "Welcome to the subranddit for fans of the Tokyo Revengers spin-off!",
        "icon_url": "https://i.pinimg.com/originals/9b/25/6e/9b256e2da0f5e5952cb89eab7fd269db.jpg",
        "banner_img": "https://i.pinimg.com/736x/b1/35/b4/b135b4b0ad57d8c4c97aad488756a1ad.jpg",
        "owner_id": 2
    },
    {
        "title": "Quintessential Quintuplets",
        "description": "We are all learning here. No shame!",
        "icon_url": "https://otakuusamagazine.com/wp-content/uploads/2022/07/quin01-480x360.jpg",
        "banner_img":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/abf6a719-b098-4efd-8181-ad5d8b4c2e41/degpq8j-60f190c6-3a9b-4322-8393-922c9fbd8954.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FiZjZhNzE5LWIwOTgtNGVmZC04MTgxLWFkNWQ4YjRjMmU0MVwvZGVncHE4ai02MGYxOTBjNi0zYTliLTQzMjItODM5My05MjJjOWZiZDg5NTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.c4cmSqO1D52sKvncx7plgUrU_sGRWxPtSiFW_5E2Hsg",
        "owner_id": 2
    },
    {
        "title": "Attack on Titan",
        "description": "Welcome to the subranddit for fans of Shingeki no Kyojin. Sasageyo!",
        "icon_url": "https://media.dayoftheshirt.com/images/shirts/fVXzq/teepublic_hi-res-attack-on-titan-scout-regiment-logo-teepublic_1644891664.large.png",
        "banner_img": "https://i.pinimg.com/originals/af/90/fc/af90fc07cefee605ea658dcd0d5189ea.jpg",
        "owner_id": 2
    },
    {
        "title": "Dr. Stone",
        "description": "Welcome to the subranddit for fans of Dr. Stone!",
        "icon_url": "https://i0.wp.com/film-bunker.com/wp-content/uploads/2019/11/https___hypebeast.com_image_2019_09_dr-stone-documentary-hypebeast-exclusive-clip-00.jpg?fit=900%2C600&ssl=1",
        "banner_img": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6de49142-7b03-4df4-859f-1d298c11e8bc/ddg1gpo-6921b626-d3bf-4691-b5cc-ca1cae8c1bae.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZkZTQ5MTQyLTdiMDMtNGRmNC04NTlmLTFkMjk4YzExZThiY1wvZGRnMWdwby02OTIxYjYyNi1kM2JmLTQ2OTEtYjVjYy1jYTFjYWU4YzFiYWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8rW_Z4zW4YhXo1ZSj6wxmlJU_3jqhAbAxgmruYxxLUk",
        "owner_id": 2
    },
    {
        "title": "Rent a Girlfriend",
        "description": "Sometimes we need company",
        "icon_url": "https://thicc.mywaifulist.moe/pending/waifus/KEJDsftpvTAq5aL4FUqgbHNK4JBOmZFmJacOvJok.jpg",
        "banner_img": "https://files.gamebanana.com/img/ss/mods/62d3162240308.jpg",
        "owner_id": 3
    }]
    for subrandy in subRandArray:
        newrandy = Subranddit(
            title = subrandy["title"],
            description = subrandy['description'],
            icon_url = subrandy['icon_url'],
            banner_img = subrandy['banner_img'],
            owner_id= subrandy['owner_id'],
        )
        db.session.add(newrandy)
    db.session.commit()

def undo_subranddits():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
