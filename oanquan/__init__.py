"""The app package."""

from importlib import metadata

try:
    __version__ = metadata.version("oanquan")
except metadata.PackageNotFoundError:
    __version__ = "unknown"
del metadata
