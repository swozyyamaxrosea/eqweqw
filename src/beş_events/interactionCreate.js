const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const bes_config = require("../../beş_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

if(value == "oda-oluştur"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(data)return button.reply({content:`> **Zaten Bir Özel Odan Bulunmakta!**`,ephemeral:true})

    const besModal = new ModalBuilder()
    .setCustomId('oda-create')
    .setTitle("Özel Oda Oluştur")

     let odaisim = new TextInputBuilder()
    .setCustomId('oda-adı')
    .setPlaceholder(`örn; Beş'in Haremi`)
    .setLabel("Oda Adı Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(10)
    .setRequired(true)
     let odalimit = new TextInputBuilder()
    .setCustomId('oda-limit')
    .setPlaceholder('0-99 | 0 = Sınırsız')
    .setLabel("Oda Limit'i Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(2)
    .setRequired(true)
     
    const name = new ActionRowBuilder().addComponents(odaisim);
	const limit = new ActionRowBuilder().addComponents(odalimit);
    besModal.addComponents(name,limit);

await button.showModal(besModal);

}else if(value == "user-ekle"){
let data = client.db.get(`özeloda_${button.member.id}`)
if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})

const besModal = new ModalBuilder()
    .setCustomId('user-add')
    .setTitle("Özel Oda Sistemi")

     let kisi = new TextInputBuilder()
    .setCustomId('kisi')
    .setPlaceholder(`Kullanıcı ID`)
    .setLabel("Bir Kullanıcı ID'si Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setMaxLength(25)
    .setRequired(true)
     
    const kisirow = new ActionRowBuilder().addComponents(kisi);
    besModal.addComponents(kisirow);

await button.showModal(besModal);

}else if(value == "user-cıkar"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
    
    const besModal = new ModalBuilder()
        .setCustomId('user-substr')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`Kullanıcı ID`)
        .setLabel("Bir Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        besModal.addComponents(kisirow);
    
    await button.showModal(besModal);
    
    }else if(value == "oda-bilgi"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
        
        let channel = button.guild.channels.cache.get(data)
        let users = client.db.get(`members_${data}`)
           
button.reply({content:
`\`\`\`fix
Oda Sahibi; ${button.member.user.tag}
Oda Adı; ${channel.name}
Oda Limiti; ${channel.userLimit == 0 ? "Sınırsız" : channel.userLimit} Kişilik
Odaya Giriş İzni Olan Kullanıcılar; ${users ? users.map((bes,n) => `${n+1}).${button.guild.members.cache.get(bes).user.tag}`).join(", ") : "Bulunamadı"}
\`\`\``,ephemeral:true})
        }else if(value == "oda-isim"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
        
        const besModal = new ModalBuilder()
        .setCustomId('oda-name')
        .setTitle("Özel Oda Sistemi")
    
         let odaisim = new TextInputBuilder()
        .setCustomId('oda-adı')
        .setPlaceholder(`örn; Beş'in Haremi`)
        .setLabel("Oda Adı Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(10)
        .setRequired(true)

        const name = new ActionRowBuilder().addComponents(odaisim);
        besModal.addComponents(name);
        await button.showModal(besModal);

    }else if(value == "oda-sil"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`>Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
        let channel = button.guild.channels.cache.get(data);
        channel.delete({reason:`Oda Sahibi Tarafından Silindi`})
        client.db.delete(`members_${data}`)
        client.db.delete(`${data}`)
        client.db.delete(`özeloda_${button.member.id}`)
       button.reply({content:`> **Özel Odan Başarıyla Silindi!**`,ephemeral:true})
    }else if(value == "sesten-at"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`>Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})

        const besModal = new ModalBuilder()
        .setCustomId('user-dis')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`örn; User ID`)
        .setLabel("Bir Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        besModal.addComponents(kisirow);
        await button.showModal(besModal);
    }else if(value == "oda-kilit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:false,
                ViewChannel:true,
                Stream:true,
                Speak:true
            });
            button.reply({content:`> Kanal Kilidini Başarıyla Kapattınız.`,ephemeral:true})
        }else if(value == "oda-herkes"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:true,
                ViewChannel:true,
                Stream:true,
                Speak:true
            });
            button.reply({content:`> Kanal Kilidini Başarıyla Açtınız.`,ephemeral:true})
        }else if(value == "oda-bit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})

            const besModal = new ModalBuilder()
            .setCustomId('bit-hız')
            .setTitle("Özel Oda Sistemi")
        
             let kisi = new TextInputBuilder()
            .setCustomId('bit')
            .setPlaceholder(`örn; 96`)
            .setLabel("Bir Bit Hızı Belirtin")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(3)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            besModal.addComponents(kisirow);
            await button.showModal(besModal);
        }else if(value == "oda-limit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> Önce kendi odanı oluşturman gerekiyor.`,ephemeral:true})

            const besModal = new ModalBuilder()
            .setCustomId('oda-sayı')
            .setTitle("Özel Oda Sistemi")
        
             let kisi = new TextInputBuilder()
            .setCustomId('limit')
            .setPlaceholder(`örn; 90`)
            .setLabel("Bir Oda Limiti Belirtin")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            besModal.addComponents(kisirow);
            await button.showModal(besModal);
        }

}



if(button.isModalSubmit()){

if(value == "oda-create"){
var name = button.fields.getTextInputValue('oda-adı');
var limit = button.fields.getTextInputValue('oda-limit');

if(isNaN(limit)) limit = 1;
if(limit < 0) limit = 0;
if(limit > 99) limit = 99;

button.guild.channels.create({
        name: `${name}`,
        type: ChannelType.GuildVoice,
        parent: bes_config.kategoriID,
        userLimit: -1,
        permissionOverwrites: [{id: button.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }, 
        {
        id: button.guild.id,
        deny: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async (bes) => {
        let invite = await bes.createInvite({maxUses: 1});
        await button.reply({content:`> **Özel Odan Başarıyla Açıldı!**\n> **Oda Adı; \`${name}\`**\n> **Oda Limit; \`${limit == 0 ? "Sınırsız":limit}\`**\n> **Oda Link'i;** https://discord.gg/${invite.code}`,ephemeral:true})
        await client.db.set(`özeloda_${button.member.id}`,`${bes.id}`)
        await client.db.set(`${bes.id}`,`${button.member.id}`)
        await client.db.push(`members_${bes.id}`,button.member.id)
        })

}else if(value == "user-add"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID)
    if(!member)return button.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
    let data = await client.db.get(`özeloda_${button.member.id}`)
    let channel = button.guild.channels.cache.get(data);
    channel.permissionOverwrites.edit(member,{
        Connect:true,
        ViewChannel:true,
        Stream:true,
        Speak:true
    });
    let invite = await channel.createInvite({maxUses: 1});
    client.db.push(`members_${data}`,member.id)
    button.reply({content:`> **${member} kullanıcısına başarıyla giriş izni verdiniz`,ephemeral:true})

}else if(value == "user-substr"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID);

    if (!member) {
        return button.reply({content:`> Sunucuda Böyle Bir Kullanıcı Bulunmamakta!`, ephemeral:true});
    }

    let data = await client.db.get(`özeloda_${button.member.id}`);
    let channel = button.guild.channels.cache.get(data);

    if (channel.members.some(m => m.id === member.id)) {
        member.voice.disconnect().then(() => {
            client.db.pull(`members_${data}`,(element, index, array) => element == member.id, true);
            channel.permissionOverwrites.edit(member, {
                Connect: false,
                ViewChannel: true,
                Stream: false,
                Speak: false
            });
            button.reply({content:`> ${member} Kullanıcısı özel odadan ve ses kanalından başarıyla atıldı!`,ephemeral:true});
        }).catch(error => {
            console.error('Kullanıcıyı ses kanalından atarken bir hata oluştu:', error);
            button.reply({content:`> **Kullanıcıyı Ses Kanalından Atarken Bir Hata Oluştu!**`, ephemeral:true});
        });
    } else {
        channel.permissionOverwrites.edit(member, {
            Connect: false,
                ViewChannel: true,
                Stream: false,
                Speak: false
        });
        button.reply({content:`> ${member} Kullanıcısı ses kanalından başarıyla yasaklandı.`,ephemeral:true});
    }




    }else if(value == "bit-hız"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        var bit = button.fields.getTextInputValue('bit');
        if(isNaN(bit))bit = 96;
        if(bit > 96) bit = 96;
        if(bit < 8) bit = 8;
        let channel = button.guild.channels.cache.get(data);
        channel.setBitrate(bit + `_000`)
        button.reply({content:`> **Özel Odanın Bit Hızı Başarıyla \`${bit}\` Olarak Ayarlandı!**`,ephemeral:true})
        }else if(value == "oda-sayı"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            var sayı = button.fields.getTextInputValue('limit');
            if(isNaN(sayı))sayı = 99;
            if(sayı > 99) sayı = 99;
            if(sayı < 0) sayı = 0;
            let channel = button.guild.channels.cache.get(data);
            channel.setUserLimit(sayı)
            button.reply({content:`> **Özel Odanın Kişi Sayısı Başarıyla \`${sayı == 0 ? "Sınırsız": sayı}\` Olarak Ayarlandı!**`,ephemeral:true})
            }



}

}

module.exports.conf = {
name: "interactionCreate"
};
