---
title: Müllerinnerungs Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Müllerinnerungs Codegeneratoren
description: Details und Infos zu den Müllerinnerungs Codegeneratoren
show_sidebar: false
layout: page 
---

{% include support_note.html %}



<h3>Hier erfolgt die Beschreibung für die Müllerinnerungs Codegeneratoren</h3>


<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown()">Waste Collection Schedule Integration und Sensor Einrichtung <span>&#9660;</span></button>
    <div id="galleryDropdown" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_mull_helfer %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>


<style>
    .dropdown {
        margin: 20px 0;
        text-align: center;
    }
    .dropdown-toggle {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        background-color: #f39c12;
        color: #ffffff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: inline-block;
    }
    .dropdown-toggle span {
        float: right;
    }
    .dropdown-content {
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #f39c12;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>

<script>
    function toggleDropdown() {
        var dropdownContent = document.getElementById("galleryDropdown");
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
</script>


