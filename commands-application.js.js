

const Discord = require('discord.js');
var aktif;
var steamid;
var nedenmc;
exports.run = (client, message, args) => {
    if (message.author.bot) return;
    let filter = m => m.author.id === message.author.id;
    message.delete();
    message.guild.createChannel(`başvuru-${message.author.username}`, 'text').then(kanal => {
        message.guild.roles.forEach((role) => {
            if (role.hasPermission("ADMINISTRATOR")) {
                kanal.overwritePermissions(role, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true
                }).catch(err => console.log(err))
            }
        })
        kanal.overwritePermissions(message.author.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        }).catch()
        kanal.overwritePermissions(message.guild.id, {
            VIEW_CHANNEL: false
        })
        kanal.send(message.author)
        const ilkmesaj = new Discord.RichEmbed()
            .setTitle("CrashNW  Başvuru Sistemi")
            .setColor("RED")
            .setDescription("**Günde Kaç Saat Aktif Olabilirsin ?**")
        kanal.send(ilkmesaj).then(mesaj => {
            kanal.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            }).then(collected => {
                aktif = collected.first().content;
                collected.first().delete();
                const ikinci = new Discord.RichEmbed()
                    .setTitle( "CrashNW Başvuru Sistemi")
                    .setColor("RED")
                    .setDescription("**Oyun İçi Adınız Nedir ?")
                mesaj.edit(ikinci).then(mesaj => {
                    kanal.awaitMessages(filter, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    }).then(collected => {
                        steamid = collected.first().content
                        collected.first().delete();
                  const ucuncu = new Discord.RichEmbed()
                      .setTitle("CrashNW Başvuru Sistemi")
                      .setColor("RED")
                      .setDescription("**Hangi yetki için başvuru yaptınız?**")
                  mesaj.edit(ucuncu).then(mesaj => {
                      kanal.awaitMessages(filter, {
                          max: 1,
                          time: 20000,
                          errors: ['time']
                      }).then(collected => {
                          nedenmc = collected.first().content
                          collected.first().delete();
                          kanal.delete()
                        const form = new Discord.RichEmbed()
                            .setTitle(`${message.author.tag} - Başvuru Formu`)
                            .addField("Kullanıcı Adı.", message.author.tag)
                            .addField("Aktiflik", aktif)
                            .addField("Oyun İçi Adınız", steamid)
                            .addField("HANGİ YETKİ İÇİN BAŞVURU YAPTINIZ ?", nedenmc)
                        message.guild.channels.get("SEND THE FORM TO İD").send(form)
                        message.author.send("Your application has been successfully sent to the authorities.")
                            })
                        })
                    })
                })
            })
        })
    })
};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['başvur'],
    permLevel: 0
};

exports.help = {
    name: 'başvuru',
    description: 'Başvuru yaparsınız',
    usage: 'başvuru'
};